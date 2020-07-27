namespace Script
{
    using System;
    using System.Xml;
    using System.Xml.Schema;
    using HP.ST.Ext.BasicActivities;
    using HP.ST.Fwk.RunTimeFWK;
    using HP.ST.Fwk.RunTimeFWK.ActivityFWK;
    using HP.ST.Fwk.RunTimeFWK.Utilities;
    using HP.ST.Fwk.RunTimeFWK.CompositeActivities;
	using HP.ST.Ext.CustomDataProviders.Extensions;
	using HP.ST.Ext.CustomDataProviders.ExcelFileArguments;
    
    [Serializable()]
    public class TestUserCode : TestEntities
    {
    	
    	

    	/// <summary>
    	/// Handler for the StServiceCallActivity9 Activity’s CodeCheckPointEvent event.
    	/// </summary>
    	/// <param name=\"sender\">The activity object that raised the CodeCheckPointEvent event.</param>
    	/// <param name=\"args\">The event arguments passed to the activity.</param>
    	/// Use this.StServiceCallActivity9 to access the StServiceCallActivity9 Activity's context, including input and output properties.
    	public void StServiceCallActivity9_OnCodeCheckPointEvent(object sender, CheckpointEventArgs args)
    	{
    		
    		var dataSrc = GetDataSource("FlightsAPI_Data!API");
    		
    		string testType = dataSrc.GetValue(this.Loop2.CurrentIterationNumber-1, "TestType").ToString();
    		
    		if(testType.Equals("Negative"))
    		{
    			args.Checkpoint.RunUICheckpoints = false;
    			
    			Context.UserLogger.Info("Fault Code: "+this.StServiceCallActivity9.ExpectedFaultProperties.InnerXml);
    			
    			string faultString = this.StServiceCallActivity9.ExpectedFaultProperties.SelectSingleNode("/*[local-name(.)='Envelope'][1]/*[local-name(.)='Body'][1]//*[local-name(.)='Fault'][1]//*[local-name(.)='faultstring'][1]").InnerText;
    			
    			args.Checkpoint.Assert.Equals(faultString,"Flight number does not exist.");
    			
    			this.StServiceCallActivity8.IsSkip = true;
    			
    			this.StServiceCallActivity10.IsSkip = true;
    			
    			this.StServiceCallActivity11.IsSkip = true;
    		}
    	}

    	/// <summary>
    	/// Handler for the StServiceCallActivity9 Activity’s BeforeExecuteStepEvent event.
    	/// </summary>
    	/// <param name=\"sender\">The activity object that raised the BeforeExecuteStepEvent event.</param>
    	/// <param name=\"args\">The event arguments passed to the activity.</param>
    	/// Use this.StServiceCallActivity9 to access the StServiceCallActivity9 Activity's context, including input and output properties.
    	public void StServiceCallActivity9_OnBeforeExecuteStepEvent(object sender, STActivityBaseEventArgs args)
    	{
    		var dataSrc = GetDataSource("FlightsAPI_Data!API");
    		
    		Context.UserLogger.Info("Count "+dataSrc.RowsCount);
    		
    		string testType = dataSrc.GetValue(this.Loop2.CurrentIterationNumber-1, "TestType").ToString();
    		
    		this.StServiceCallActivity9.Parent.Name = testType+" Scenario";
    		
    		if(testType.Equals("Negative"))
    		{
    			this.StServiceCallActivity9.FaultExpected = true;
    		}
    			
    	}


    	/// <summary>
    	/// Handler for the CodeActivity14 Activity’s ExecuteEvent event.
    	/// </summary>
    	/// <param name=\"sender\">The activity object that raised the ExecuteEvent event.</param>
    	/// <param name=\"args\">The event arguments passed to the activity.</param>
    	/// Use this.CodeActivity14 to access the CodeActivity14 Activity's context, including input and output properties.
    	public void CodeActivity14_OnExecuteEvent(object sender, STActivityBaseEventArgs args)
    	{
    		args.Activity.Report("Reporting", "Negative");
    	}

}

}
