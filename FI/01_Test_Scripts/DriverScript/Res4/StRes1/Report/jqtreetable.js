/* 
Copyright: Paul Hanlon

Released under the MIT/BSD licence which means you can do anything you want 
with it, as long as you keep this copyright notice on the page 
*/
(function(jq){
  jq.fn.jqTreeTable=function(map, options){
    var opts = jq.extend({openImg:"",shutImg:"",leafImg:"",lastOpenImg:"",lastShutImg:"",lastLeafImg:"",vertLineImg:"",blankImg:"",collapse:false,column:0,striped:false,highlight:false,state:true},options),
    mapa=[],mapb=[],tid=this.attr("id"),collarr=[],
	  stripe=function(){
      if(opts.striped){
  		  $("#"+tid+" tr:visible").filter(":even").addClass("even").end().filter(":odd").removeClass("even");
      }
	  },
    buildText = function(parno, preStr){//Recursively build up the text for the images that make it work
      var mp=mapa[parno], ro=0, pre="", pref, img;
      for (var y=0,yl=mp.length;y<yl;y++){
        ro = mp[y];
        if (mapa[ro]){//It's a parent as well. Build it's string and move on to it's children
          pre=(y==yl-1)? opts.blankImg: opts.vertLineImg;
          img=(y==yl-1)? opts.lastOpenImg: opts.openImg;
          mapb[ro-1] = preStr + '<img src="'+img+'" class="parimg" id="'+tid+ro+'">';
          pref = preStr + '<img src="'+pre+'" class="preimg">';
          arguments.callee(ro, pref);
        }else{//it's a child
          img = (y==yl-1)? opts.lastLeafImg: opts.leafImg;//It's the last child, It's child will have a blank field behind it
          mapb[ro-1] = preStr + '<img src="'+img+'" class="ttimage" id="'+tid+ro+'">';
        }
      }
    },
    expandKids = function(num, last){//Expands immediate children, and their uncollapsed children
      jq("#"+tid+num).attr("src", (last)? opts.lastOpenImg: opts.openImg);//
      for (var x=0, xl=mapa[num].length;x<xl;x++){
        var mnx = mapa[num][x];
        jq("#"+tid+mnx).parents("tr").removeClass("collapsed");
  			if (mapa[mnx] && opts.state && jq.inArray(mnx, collarr)<0){////If it is a parent and its number is not in the collapsed array
          arguments.callee(mnx,(x==xl-1));//Expand it. More intuitive way of displaying the tree
        }
      }
    },
    collapseKids = function(num, last){//Recursively collapses all children and their children and change icon
      jq("#"+tid+num).attr("src", (last)? opts.lastShutImg: opts.shutImg);
      for (var x=0, xl=mapa[num].length;x<xl;x++){
        var mnx = mapa[num][x];
        jq("#"+tid+mnx).parents("tr").addClass("collapsed");
        if (mapa[mnx]){//If it is a parent
          arguments.callee(mnx,(x==xl-1));
        }
      }
    },
  	creset = function(num, exp){//Resets the collapse array
  		var o = (exp)? collarr.splice(jq.inArray(num, collarr), 1): collarr.push(num);
      cset(tid,collarr);
  	},
  	cget = function(n){
	  	var v='',c=' '+document.cookie+';',s=c.indexOf(' '+n+'=');
	    if (s>=0) {
	    	s+=n.length+2;
	      v=(c.substring(s,c.indexOf(';',s))).split("|");
	    }
	    return v||0;
  	},
    cset = function (n,v) {
  		jq.unique(v);
	  	document.cookie = n+"="+v.join("|")+";";
	  };
    for (var x=0,xl=map.length; x<xl;x++){//From map of parents, get map of kids
      num = map[x];
      if (!mapa[num]){
        mapa[num]=[];
      }
      mapa[num].push(x+1);
    }
    buildText(0,"");
    jq("tr", this).each(function(i){//Inject the images into the column to make it work
      jq(this).children("td").eq(opts.column).prepend(mapb[i]);
      
    });
		collarr = cget(tid)||opts.collapse||collarr;
		if (collarr.length){
			cset(tid,collarr);
	    for (var y=0,yl=collarr.length;y<yl;y++){
	      collapseKids(collarr[y],($("#"+collarr[y]+ " .parimg").attr("src")==opts.lastOpenImg));
	    }
		}
    stripe();
    jq(".parimg", this).each(function(i){
      var jqt = jq(this),last;
      jqt.click(function(){
        var num = parseInt(jqt.attr("id").substr(tid.length));//Number of the row
        if (jqt.parents("tr").next().is(".collapsed")){//If the table row directly below is collapsed
          expandKids(num, (jqt.attr("src")==opts.lastShutImg));//Then expand all children not in collarr
					if(opts.state){creset(num,true);}//If state is set, store in cookie
        }else{//Collapse all and set image to opts.shutImg or opts.lastShutImg on parents
          collapseKids(num, (jqt.attr("src")==opts.lastOpenImg));
					if(opts.state){creset(num,false);}//If state is set, store in cookie
        }
        stripe();//Restripe the rows
      });
    });
    if (opts.highlight){//This is where it highlights the rows
      jq("tr", this).hover(
        function(){jq(this).addClass("over");},
        function(){jq(this).removeClass("over");}
      );
    };
  };
  return this;
})(jQuery);

// SIG // Begin signature block
// SIG // MIIijAYJKoZIhvcNAQcCoIIifTCCInkCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // MqtnW6RLrOSGDtOQJDHk21B4zyGIse0tnkmjewFfRKWg
// SIG // ghDkMIIFbDCCBFSgAwIBAgIRAKh1UvVEyZ+hluYBHTOV
// SIG // xU0wDQYJKoZIhvcNAQELBQAwfDELMAkGA1UEBhMCR0Ix
// SIG // GzAZBgNVBAgTEkdyZWF0ZXIgTWFuY2hlc3RlcjEQMA4G
// SIG // A1UEBxMHU2FsZm9yZDEYMBYGA1UEChMPU2VjdGlnbyBM
// SIG // aW1pdGVkMSQwIgYDVQQDExtTZWN0aWdvIFJTQSBDb2Rl
// SIG // IFNpZ25pbmcgQ0EwHhcNMTkwNDA5MDAwMDAwWhcNMjAw
// SIG // NDA4MjM1OTU5WjCBtjELMAkGA1UEBhMCR0IxETAPBgNV
// SIG // BBEMCFJHMTQgMVFOMRIwEAYDVQQIDAlCZXJrc2hpcmUx
// SIG // EDAOBgNVBAcMB05ld2J1cnkxJjAkBgNVBAkMHVRoZSBM
// SIG // YXduLCAyMi0zMCBPbGQgQmF0aCBSb2FkMSIwIAYDVQQK
// SIG // DBlNaWNybyBGb2N1cyBHcm91cCBMaW1pdGVkMSIwIAYD
// SIG // VQQDDBlNaWNybyBGb2N1cyBHcm91cCBMaW1pdGVkMIIB
// SIG // IjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsLV9
// SIG // cmRmLPSR/tntkEW5tiYsLQsCYJEnY+aoSAak8R6k+q39
// SIG // shXy4COKx2yAFENHKnjunT6ebDdc+uVexBVkj66c5A5g
// SIG // LjUvEu608ZjKzQwnDQJGFkomFFdYlf8/8LsFpkDZNMg5
// SIG // xbcmrwXEHLrVmSLgXFmearg2xzusHxp6Q9uU4L//kPmj
// SIG // K30jxEcYHmhde5HXTrkjxeUvJX3FzgtYebEfVCcJa+Fi
// SIG // mzRYPVfapFILgyv6FA6ZNJamEYf9KzG3cSdNT0kQgqu6
// SIG // 9j2h9zg0jeUaY/aiYHK+YHY+/5HtIGBNB8IKduOW9dJg
// SIG // BNDkR59+HBgLBsKiroht2K/5FHGQLQIDAQABo4IBrDCC
// SIG // AagwHwYDVR0jBBgwFoAUDuE6qFM6MdWKvsG7rWcaA4Wt
// SIG // NA4wHQYDVR0OBBYEFH5MDtmDr6g/F8LVbGMF+51yVK7+
// SIG // MA4GA1UdDwEB/wQEAwIHgDAMBgNVHRMBAf8EAjAAMBMG
// SIG // A1UdJQQMMAoGCCsGAQUFBwMDMBEGCWCGSAGG+EIBAQQE
// SIG // AwIEEDBABgNVHSAEOTA3MDUGDCsGAQQBsjEBAgEDAjAl
// SIG // MCMGCCsGAQUFBwIBFhdodHRwczovL3NlY3RpZ28uY29t
// SIG // L0NQUzBDBgNVHR8EPDA6MDigNqA0hjJodHRwOi8vY3Js
// SIG // LnNlY3RpZ28uY29tL1NlY3RpZ29SU0FDb2RlU2lnbmlu
// SIG // Z0NBLmNybDBzBggrBgEFBQcBAQRnMGUwPgYIKwYBBQUH
// SIG // MAKGMmh0dHA6Ly9jcnQuc2VjdGlnby5jb20vU2VjdGln
// SIG // b1JTQUNvZGVTaWduaW5nQ0EuY3J0MCMGCCsGAQUFBzAB
// SIG // hhdodHRwOi8vb2NzcC5zZWN0aWdvLmNvbTAkBgNVHREE
// SIG // HTAbgRlvdmFkLnR6aW9uQG1pY3JvZm9jdXMuY29tMA0G
// SIG // CSqGSIb3DQEBCwUAA4IBAQA2X8W52EbDZEqNC3zbg70I
// SIG // W/OrguRIqVho+CpMSmOYYAPPAvFK+k8Uvu/dQ20QSsRS
// SIG // 1BDpC18j4aYtDG2dKjm0ow0W/nUioFrX26gmcRWVJ8ns
// SIG // BFcgxeWjyr9g8uTo/T2bUvyuomw8u01dj9mHM+e8EHN6
// SIG // Yda1RauWkURexTrC8h2SJZVfioaP+08tZ4/UCbzcy7FY
// SIG // quHrMci5uOpAsMMNLmDIT6bMjleowoaPd6CM17RI+Dru
// SIG // EMhyhG/izcBjTUS9d7RwNHhytDvkDpKAKyz3vIE34kFp
// SIG // xb2hb6+P2A4xMSWY2j84I6P/G/54+iLfnS0bNl2P9Sig
// SIG // 8tMHYR5ZCgHrMIIFdzCCBF+gAwIBAgIQE+oocFv07O0M
// SIG // NmMJgGFDNjANBgkqhkiG9w0BAQwFADBvMQswCQYDVQQG
// SIG // EwJTRTEUMBIGA1UEChMLQWRkVHJ1c3QgQUIxJjAkBgNV
// SIG // BAsTHUFkZFRydXN0IEV4dGVybmFsIFRUUCBOZXR3b3Jr
// SIG // MSIwIAYDVQQDExlBZGRUcnVzdCBFeHRlcm5hbCBDQSBS
// SIG // b290MB4XDTAwMDUzMDEwNDgzOFoXDTIwMDUzMDEwNDgz
// SIG // OFowgYgxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpOZXcg
// SIG // SmVyc2V5MRQwEgYDVQQHEwtKZXJzZXkgQ2l0eTEeMBwG
// SIG // A1UEChMVVGhlIFVTRVJUUlVTVCBOZXR3b3JrMS4wLAYD
// SIG // VQQDEyVVU0VSVHJ1c3QgUlNBIENlcnRpZmljYXRpb24g
// SIG // QXV0aG9yaXR5MIICIjANBgkqhkiG9w0BAQEFAAOCAg8A
// SIG // MIICCgKCAgEAgBJlFzYOw9sIs9CsVw127c0n00ytUINh
// SIG // 4qogTQktZAnczomfzD2p7PbPwdzx07HWezcoEStH2jnG
// SIG // vDoZtF+mvX2do2NCtnbyqTsrkfjib9DsFiCQCT7i6HTJ
// SIG // GLSR1GJk23+jBvGIGGqQIjy8/hPwhxR79uQfjtTkUcYR
// SIG // Z0YIUcuGFFQ/vDP+fmyc/xadGL1RjjWmp2bIcmfbIWax
// SIG // 1Jt4A8BQOujM8Ny8nkz+rwWWNR9XWrf/zvk9tyy29lTd
// SIG // yOcSOk2uTIq3XJq0tyA9yn8iNK5+O2hmAUTnAU5GU5sz
// SIG // YPeUvlM3kHND8zLDU+/bqv50TmnHa4xgk97Exwzf4TKu
// SIG // zJM7UXiVZ4vuPVb+DNBpDxsP8yUmazNt925H+nND5X4O
// SIG // pWaxKXwyhGNVicQNwZNUMBkTrNN9N6frXTpsNVzbQdcS
// SIG // 2qlJC9/YgIoJk2KOtWbPJYjNhLixP6Q5D9kCnusSTJV8
// SIG // 82sFqV4Wg8y4Z+LoE53MW4LTTLPtW//e5XOsIzstAL81
// SIG // VXQJSdhJWBp/kjbmUZIO8yZ9HE0XvMnsQybQv0FfQKlE
// SIG // RPSZ51eHnlAfV1SoPv10Yy+xUGUJ5lhCLkMaTLTwJUdZ
// SIG // +gQek9QmRkpQgbLevni3/GcV4clXhB4PY9bpYrrWX1Uu
// SIG // 6lzGKAgEJTm4Diup8kyXHAc/DVL17e8vgg8CAwEAAaOB
// SIG // 9DCB8TAfBgNVHSMEGDAWgBStvZh6NLQm9/rEJlTvA73g
// SIG // JMtUGjAdBgNVHQ4EFgQUU3m/WqorSs9UgOHYm8Cd8rID
// SIG // ZsswDgYDVR0PAQH/BAQDAgGGMA8GA1UdEwEB/wQFMAMB
// SIG // Af8wEQYDVR0gBAowCDAGBgRVHSAAMEQGA1UdHwQ9MDsw
// SIG // OaA3oDWGM2h0dHA6Ly9jcmwudXNlcnRydXN0LmNvbS9B
// SIG // ZGRUcnVzdEV4dGVybmFsQ0FSb290LmNybDA1BggrBgEF
// SIG // BQcBAQQpMCcwJQYIKwYBBQUHMAGGGWh0dHA6Ly9vY3Nw
// SIG // LnVzZXJ0cnVzdC5jb20wDQYJKoZIhvcNAQEMBQADggEB
// SIG // AJNl9jeDlQ9ew4IcH9Z35zyKwKoJ8OkLJvHgwmp1ocd5
// SIG // yblSYMgpEg7wrQPWCcR23+WmgZWnRtqCV6mVksW2jwMi
// SIG // bDN3wXsyF24HzloUQToFJBv2FAY7qCUkDrvMKnXduXBB
// SIG // P3zQYzYhBx9G/2CkkeFnvN4ffhkUyWNnkepnB2u0j4vA
// SIG // bkN9w6GAbLIevFOFfdyQoaS8Le9Gclc1Bb+7RrtubTeZ
// SIG // tv8jkpHGbkD4jylW6l/VXxRTrPBPYer3IsynVgviuDQf
// SIG // Jtl7GQVoP7o81DgGotPmjw7jtHFtQELFhLRAlSv0ZaBI
// SIG // efYdgWOWnU914Ph85I6p0fKtirOMxyHNwu8wggX1MIID
// SIG // 3aADAgECAhAdokgwb5smGNCC4JZ9M9NqMA0GCSqGSIb3
// SIG // DQEBDAUAMIGIMQswCQYDVQQGEwJVUzETMBEGA1UECBMK
// SIG // TmV3IEplcnNleTEUMBIGA1UEBxMLSmVyc2V5IENpdHkx
// SIG // HjAcBgNVBAoTFVRoZSBVU0VSVFJVU1QgTmV0d29yazEu
// SIG // MCwGA1UEAxMlVVNFUlRydXN0IFJTQSBDZXJ0aWZpY2F0
// SIG // aW9uIEF1dGhvcml0eTAeFw0xODExMDIwMDAwMDBaFw0z
// SIG // MDEyMzEyMzU5NTlaMHwxCzAJBgNVBAYTAkdCMRswGQYD
// SIG // VQQIExJHcmVhdGVyIE1hbmNoZXN0ZXIxEDAOBgNVBAcT
// SIG // B1NhbGZvcmQxGDAWBgNVBAoTD1NlY3RpZ28gTGltaXRl
// SIG // ZDEkMCIGA1UEAxMbU2VjdGlnbyBSU0EgQ29kZSBTaWdu
// SIG // aW5nIENBMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIB
// SIG // CgKCAQEAhiKNMoV6GJ9J8JYvYwgeLdx8nxTP4ya2JWYp
// SIG // QIZURnQxYsUQ7bKHJ6aZy5UwwFb1pHXGqQ5QYqVRkRBq
// SIG // 4Etirv3w+Bisp//uLjMg+gwZiahse60Aw2Gh3GllbR9u
// SIG // J5bXl1GGpvQn5Xxqi5UeW2DVftcWkpwAL2j3l+1qcr44
// SIG // O2Pej79uTEFdEiAIWeg5zY/S1s8GtFcFtk6hPldrH5i8
// SIG // xGLWGwuNx2YbSp+dgcRyQLXiX+8LRf+jzhemLVWwt7C8
// SIG // VGqdvI1WU8bwunlQSSz3A7n+L2U18iLqLAevRtn5Rhzc
// SIG // jHxxKPP+p8YU3VWRbooRDd8GJJV9D6ehfDrahjVh0wID
// SIG // AQABo4IBZDCCAWAwHwYDVR0jBBgwFoAUU3m/WqorSs9U
// SIG // gOHYm8Cd8rIDZsswHQYDVR0OBBYEFA7hOqhTOjHVir7B
// SIG // u61nGgOFrTQOMA4GA1UdDwEB/wQEAwIBhjASBgNVHRMB
// SIG // Af8ECDAGAQH/AgEAMB0GA1UdJQQWMBQGCCsGAQUFBwMD
// SIG // BggrBgEFBQcDCDARBgNVHSAECjAIMAYGBFUdIAAwUAYD
// SIG // VR0fBEkwRzBFoEOgQYY/aHR0cDovL2NybC51c2VydHJ1
// SIG // c3QuY29tL1VTRVJUcnVzdFJTQUNlcnRpZmljYXRpb25B
// SIG // dXRob3JpdHkuY3JsMHYGCCsGAQUFBwEBBGowaDA/Bggr
// SIG // BgEFBQcwAoYzaHR0cDovL2NydC51c2VydHJ1c3QuY29t
// SIG // L1VTRVJUcnVzdFJTQUFkZFRydXN0Q0EuY3J0MCUGCCsG
// SIG // AQUFBzABhhlodHRwOi8vb2NzcC51c2VydHJ1c3QuY29t
// SIG // MA0GCSqGSIb3DQEBDAUAA4ICAQBNY1DtRzRKYaTb3moq
// SIG // jJvxAAAeHWJ7Otcywvaz4GOz+2EAiJobbRAHBE++uOqJ
// SIG // eCLrD0bs80ZeQEaJEvQLd1qcKkE6/Nb06+f3FZUzw6GD
// SIG // KLfeL+SU94Uzgy1KQEi/msJPSrGPJPSzgTfTt2SwpiNq
// SIG // WWhSQl//BOvhdGV5CPWpk95rcUCZlrp48bnI4sMIFrGr
// SIG // Y1rIFYBtdF5KdX6luMNstc/fSnmHXMdATWM19jDTz7UK
// SIG // DgsEf6BLrrujpdCEAJM+U100pQA1aWy+nyAlEA0Z+1CQ
// SIG // Yb45j3qOTfafDh7+B1ESZoMmGUiVzkrJwX/zOgWb+W/f
// SIG // iH/AI57SHkN6RTHBnE2p8FmyWRnoao0pBAJ3fEtLzXC+
// SIG // OrJVWng+vLtvAxAldxU0ivk2zEOS5LpP8WKTKCVXKftR
// SIG // GcehJUBqhFfGsp2xvBwK2nxnfn0u6ShMGH7EezFBcZpL
// SIG // KewLPVdQ0srd/Z4FUeVEeN0B3rF1mA1UJP3wTuPi+IO9
// SIG // crrLPTru8F4XkmhtyGH5pvEqCgulufSe7pgyBYWe6/mD
// SIG // KdPGLH29OncuizdCoGqC7TtKqpQQpOEN+BfFtlp5MxiS
// SIG // 47V1+KHpjgolHuQe8Z9ahyP/n6RRnvs5gBHN27XEp6iA
// SIG // b+VT1ODjosLSWxr6MiYtaldwHDykWC6j81tLB9wyWfOH
// SIG // pxptWDGCEQAwghD8AgEBMIGRMHwxCzAJBgNVBAYTAkdC
// SIG // MRswGQYDVQQIExJHcmVhdGVyIE1hbmNoZXN0ZXIxEDAO
// SIG // BgNVBAcTB1NhbGZvcmQxGDAWBgNVBAoTD1NlY3RpZ28g
// SIG // TGltaXRlZDEkMCIGA1UEAxMbU2VjdGlnbyBSU0EgQ29k
// SIG // ZSBTaWduaW5nIENBAhEAqHVS9UTJn6GW5gEdM5XFTTAN
// SIG // BglghkgBZQMEAgEFAKB8MBAGCisGAQQBgjcCAQwxAjAA
// SIG // MBkGCSqGSIb3DQEJAzEMBgorBgEEAYI3AgEEMBwGCisG
// SIG // AQQBgjcCAQsxDjAMBgorBgEEAYI3AgEVMC8GCSqGSIb3
// SIG // DQEJBDEiBCCU2R4mwLBgo8ogukIyON3l+jq2vp8LKlGD
// SIG // RJoEYnG+9TANBgkqhkiG9w0BAQEFAASCAQB//DZnyCBh
// SIG // i6/ODx61IgLdr79fys1BJQFdLJQ1r8NNNA/S5N6TjSbB
// SIG // GKPDB252tFMhM8kiLjoQ1049djf/CUcZXf1TukBfrQND
// SIG // Ropo7e99EUJHYOnf2P0f2LZwI7JT/H4C6Q1vEDc4wCYE
// SIG // gmA8tMv3rgs6HD97kmBrH9GW+aAYJIC474m1KlmFYedd
// SIG // cmAu6l0MHPUf09Cr1+uNXPSodRCy90FqXHrjChjbgunP
// SIG // cZPxVq9XagwEMn5fqyZVtDGeFxnE6SZ36ybBqcfHZCSo
// SIG // oTghgM3wsy6RiWyheIs4sUXtUbudNW9cMjr0BGSfIHH5
// SIG // je8cQBHvfrm7gEENOrPLT8HCoYIOwTCCDr0GCisGAQQB
// SIG // gjcDAwExgg6tMIIOqQYJKoZIhvcNAQcCoIIOmjCCDpYC
// SIG // AQMxDzANBglghkgBZQMEAgEFADCB8gYLKoZIhvcNAQkQ
// SIG // AQSggeIEgd8wgdwCAQEGCWCGSIb6bAoDBTAxMA0GCWCG
// SIG // SAFlAwQCAQUABCB8KL3eKw96Vopn/PLbis+u5IzNKE0O
// SIG // JJmeP9gTeLIsvQIGXQE89HdTGBMyMDE5MDYxMzA2Mzcy
// SIG // Ni4zMzRaMASAAgH0oHakdDByMQswCQYDVQQGEwJDQTEQ
// SIG // MA4GA1UECBMHT250YXJpbzEPMA0GA1UEBxMGT3R0YXdh
// SIG // MRYwFAYDVQQKEw1FbnRydXN0LCBJbmMuMSgwJgYDVQQD
// SIG // Ex9FbnRydXN0IFRpbWUgU3RhbXBpbmcgQXV0aG9yaXR5
// SIG // oIIKIzCCBQgwggPwoAMCAQICECuxdBabjEJWAAAAAFWR
// SIG // 6Q4wDQYJKoZIhvcNAQELBQAwgbIxCzAJBgNVBAYTAlVT
// SIG // MRYwFAYDVQQKEw1FbnRydXN0LCBJbmMuMSgwJgYDVQQL
// SIG // Ex9TZWUgd3d3LmVudHJ1c3QubmV0L2xlZ2FsLXRlcm1z
// SIG // MTkwNwYDVQQLEzAoYykgMjAxNSBFbnRydXN0LCBJbmMu
// SIG // IC0gZm9yIGF1dGhvcml6ZWQgdXNlIG9ubHkxJjAkBgNV
// SIG // BAMTHUVudHJ1c3QgVGltZXN0YW1waW5nIENBIC0gVFMx
// SIG // MB4XDTE4MTAwNTIwMzMyM1oXDTMwMDEwNTIxMDMyM1ow
// SIG // cjELMAkGA1UEBhMCQ0ExEDAOBgNVBAgTB09udGFyaW8x
// SIG // DzANBgNVBAcTBk90dGF3YTEWMBQGA1UEChMNRW50cnVz
// SIG // dCwgSW5jLjEoMCYGA1UEAxMfRW50cnVzdCBUaW1lIFN0
// SIG // YW1waW5nIEF1dGhvcml0eTCCASIwDQYJKoZIhvcNAQEB
// SIG // BQADggEPADCCAQoCggEBAKxb7aOdViK7aK7Ubkl/R59A
// SIG // bG1Q1g1EFd7pqGgMIgTLH4XjnqLGATQ/Mor95klX8LFF
// SIG // XC4YY9gvLHhPKU/gplhIU74unFB+uDafRa1i/1nrRF51
// SIG // jWsgcpSBVlFtULNMrTTB9sQPJx3oEIHqOcmJ8XahsVOI
// SIG // 35jAm+ol2SIW5M3+zBtb+wK+rm3eMywwjWgqTKVXcY/u
// SIG // apbLAFcNidphqSPJV0XZRuIck0EfsJfbG5cDayVZ1gnI
// SIG // 5RYZPdQe0abh8ksT4ELBhw4yXwsMyhos1lyaZbHUkrYn
// SIG // 5puRmdM64owBW/01ESRJq3XQCT2riHywqeqrVQSHaTfI
// SIG // BqpQ7QsDsUkCAwEAAaOCAVcwggFTMA4GA1UdDwEB/wQE
// SIG // AwIHgDAWBgNVHSUBAf8EDDAKBggrBgEFBQcDCDBBBgNV
// SIG // HSAEOjA4MDYGCmCGSAGG+mwKAwUwKDAmBggrBgEFBQcC
// SIG // ARYaaHR0cDovL3d3dy5lbnRydXN0Lm5ldC9ycGEwCQYD
// SIG // VR0TBAIwADBoBggrBgEFBQcBAQRcMFowIwYIKwYBBQUH
// SIG // MAGGF2h0dHA6Ly9vY3NwLmVudHJ1c3QubmV0MDMGCCsG
// SIG // AQUFBzAChidodHRwOi8vYWlhLmVudHJ1c3QubmV0L3Rz
// SIG // MS1jaGFpbjI1Ni5jZXIwMQYDVR0fBCowKDAmoCSgIoYg
// SIG // aHR0cDovL2NybC5lbnRydXN0Lm5ldC90czFjYS5jcmww
// SIG // HwYDVR0jBBgwFoAUw8Jx0nvXaAWuOzmbNCUMYgPHV2gw
// SIG // HQYDVR0OBBYEFN5syegGie4GwWfYNqolv1OarCYDMA0G
// SIG // CSqGSIb3DQEBCwUAA4IBAQDR2AWrmbbOq5dQkVo0btg0
// SIG // wn+/yNpYuRcRiaMtP86k8BOZcd14uPoMiRnmI2W9mzKn
// SIG // kOWFSNhyUgVjwhZd+fPJyn15lLzQwyvgbHv6XT2lavk7
// SIG // vMkEZpClNRUw+SWmDnkUqDWh3SmFUTJUo8DIYSd27tRE
// SIG // z2MemDFFP+Pd+IEfUREuXm0t3/CoB4XnFhiacguWZIM1
// SIG // tvh96z2h1Rab2vA5+U4wl0UECOPZGnpXGuh0SpLrRMnD
// SIG // 4I4u9Gqt4i0LD3RL/IZZSthNkUsd6AeAy190stHYN/HC
// SIG // C7qlX+C74sILYHX2yizjDOW5eTMUx3YDLVPcvvCfLvoe
// SIG // kbW5LJJ8FulxMIIFEzCCA/ugAwIBAgIMWNoT/wAAAABR
// SIG // zg33MA0GCSqGSIb3DQEBCwUAMIG0MRQwEgYDVQQKEwtF
// SIG // bnRydXN0Lm5ldDFAMD4GA1UECxQ3d3d3LmVudHJ1c3Qu
// SIG // bmV0L0NQU18yMDQ4IGluY29ycC4gYnkgcmVmLiAobGlt
// SIG // aXRzIGxpYWIuKTElMCMGA1UECxMcKGMpIDE5OTkgRW50
// SIG // cnVzdC5uZXQgTGltaXRlZDEzMDEGA1UEAxMqRW50cnVz
// SIG // dC5uZXQgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkgKDIw
// SIG // NDgpMB4XDTE1MDcyMjE5MDI1NFoXDTI5MDYyMjE5MzI1
// SIG // NFowgbIxCzAJBgNVBAYTAlVTMRYwFAYDVQQKEw1FbnRy
// SIG // dXN0LCBJbmMuMSgwJgYDVQQLEx9TZWUgd3d3LmVudHJ1
// SIG // c3QubmV0L2xlZ2FsLXRlcm1zMTkwNwYDVQQLEzAoYykg
// SIG // MjAxNSBFbnRydXN0LCBJbmMuIC0gZm9yIGF1dGhvcml6
// SIG // ZWQgdXNlIG9ubHkxJjAkBgNVBAMTHUVudHJ1c3QgVGlt
// SIG // ZXN0YW1waW5nIENBIC0gVFMxMIIBIjANBgkqhkiG9w0B
// SIG // AQEFAAOCAQ8AMIIBCgKCAQEA2SPmFKTofEuFcVj7+IHm
// SIG // cotdRsOIAB840Irh1m5WMOWv2mRQfcITOfu9ZrTahPuD
// SIG // 0Cgfy3boYFBpm/POTxPiwT7B3xLLMqP4XkQiDsw66Y1J
// SIG // uWB0yN5UPUFeQ18oRqmmt8oQKyK8W01bjBdlEob9LHfV
// SIG // xaCMysKD4EdXfOdwrmJFJzEYCtTApBhVUvdgxgRLs91o
// SIG // Mm4QHzQRuBJ4ZPHuqeD347EijzRaZcuK9OFFUHTfk5em
// SIG // NObQTDufN0lSp1NOny5nXO2W/KW/dFGI46qOvdmxL19Q
// SIG // MBb0UWAia5nL/+FUO7n7RDilCDkjm2lH+jzE0Oeq30ay
// SIG // 7PKKGawpsjiVdQIDAQABo4IBIzCCAR8wEgYDVR0TAQH/
// SIG // BAgwBgEB/wIBADAOBgNVHQ8BAf8EBAMCAQYwOwYDVR0g
// SIG // BDQwMjAwBgRVHSAAMCgwJgYIKwYBBQUHAgEWGmh0dHA6
// SIG // Ly93d3cuZW50cnVzdC5uZXQvcnBhMDMGCCsGAQUFBwEB
// SIG // BCcwJTAjBggrBgEFBQcwAYYXaHR0cDovL29jc3AuZW50
// SIG // cnVzdC5uZXQwMgYDVR0fBCswKTAnoCWgI4YhaHR0cDov
// SIG // L2NybC5lbnRydXN0Lm5ldC8yMDQ4Y2EuY3JsMBMGA1Ud
// SIG // JQQMMAoGCCsGAQUFBwMIMB0GA1UdDgQWBBTDwnHSe9do
// SIG // Ba47OZs0JQxiA8dXaDAfBgNVHSMEGDAWgBRV5IHREYC+
// SIG // 2Im5CKMx+aEkCRa5cDANBgkqhkiG9w0BAQsFAAOCAQEA
// SIG // HSTnmnRbqnD8sQ4xRdcsAH9mOiugmjSqrGNtifmf3w13
// SIG // /SQj/E+ct2+P8/QftsH91hzEjIhmwWONuld307gaHshR
// SIG // rcxgNhqHaijqEWXezDwsjHS36FBD08wo6BVsESqfFJUp
// SIG // yQVXtWc26Dypg+9BwSEW0373LRFHZnZgghJpjHZVcw/f
// SIG // L0td6Wwj+Af2tX3WaUWcWH1hLvx4S0NOiZFGRCygU6hF
// SIG // ofYWWLuRE/JLxd8LwOeuKXq9RbPncDDnNI7revbTtdHe
// SIG // axOZRrOL0k2TdbXxb7/cACjCJb+856NlNOw/DR2XjPqq
// SIG // iCKkGDXbBY524xDIKY9j0K6sGNnaxJ9REjGCA2IwggNe
// SIG // AgEBMIHHMIGyMQswCQYDVQQGEwJVUzEWMBQGA1UEChMN
// SIG // RW50cnVzdCwgSW5jLjEoMCYGA1UECxMfU2VlIHd3dy5l
// SIG // bnRydXN0Lm5ldC9sZWdhbC10ZXJtczE5MDcGA1UECxMw
// SIG // KGMpIDIwMTUgRW50cnVzdCwgSW5jLiAtIGZvciBhdXRo
// SIG // b3JpemVkIHVzZSBvbmx5MSYwJAYDVQQDEx1FbnRydXN0
// SIG // IFRpbWVzdGFtcGluZyBDQSAtIFRTMQIQK7F0FpuMQlYA
// SIG // AAAAVZHpDjANBglghkgBZQMEAgEFAKCCAWswGgYJKoZI
// SIG // hvcNAQkDMQ0GCyqGSIb3DQEJEAEEMC8GCSqGSIb3DQEJ
// SIG // BDEiBCBo1c46Z76IWl4q+vSUWGetqYd8MDhC22FEX9oa
// SIG // pz6AzjCCARoGCyqGSIb3DQEJEAIMMYIBCTCCAQUwggEB
// SIG // MIHmBBROTc5XufekhljtbzJyFis0+F5pvTCBzTCBuKSB
// SIG // tTCBsjELMAkGA1UEBhMCVVMxFjAUBgNVBAoTDUVudHJ1
// SIG // c3QsIEluYy4xKDAmBgNVBAsTH1NlZSB3d3cuZW50cnVz
// SIG // dC5uZXQvbGVnYWwtdGVybXMxOTA3BgNVBAsTMChjKSAy
// SIG // MDE1IEVudHJ1c3QsIEluYy4gLSBmb3IgYXV0aG9yaXpl
// SIG // ZCB1c2Ugb25seTEmMCQGA1UEAxMdRW50cnVzdCBUaW1l
// SIG // c3RhbXBpbmcgQ0EgLSBUUzECECuxdBabjEJWAAAAAFWR
// SIG // 6Q4wFgQUwIW7id0GMd2qyHnlmW7MbfeqqYIwDQYJKoZI
// SIG // hvcNAQELBQAEggEAEGqNmxgHDeWIurjU74bFPZK4p0Ms
// SIG // OvMO0rp2s2WyUe4CFr6Yz0wk63p0SWcRNsZf1+9U5CYC
// SIG // J1xhtH1HpXzCMY97fIYwvjYXHe52VdAdblzbVcVdy744
// SIG // NwCjD7a3Fh62YrwPT6OnSPbtv9J56aQM5MOXOUUsKuTC
// SIG // hSQVxa1s1wxNB5nnASNxYli6jJJj2vE3iHJGZABW0Wad
// SIG // L9CoIG5IxeW7/j2ObPizRtke9r3PxyQszOujlqTNDtKw
// SIG // jz9Vcf9/4lQmwVdedRj9cprYPUkVc1ArQgMe7ZzUKJZe
// SIG // hJz8pGx+ocFhsmqpi1+lQGsPL3bYjUDo7hc++vQazlyo
// SIG // mTEIXA==
// SIG // End signature block
