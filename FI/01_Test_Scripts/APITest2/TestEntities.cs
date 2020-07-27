using System;
    using System.Collections.Generic;
    using System.Text;
    using HP.ST.Fwk.RunTimeFWK.Utilities;
    using HP.ST.Fwk.RunTimeFWK.BindingFWK;
    
    namespace Script
    {
    
    public class TestEntities
    {
    public ISTRunTimeContext Context = null;
    public Dictionary<string, HP.ST.Fwk.RunTimeFWK.DataHandling.IDataSource> dataSourceNameToDataSource = new Dictionary<string, HP.ST.Fwk.RunTimeFWK.DataHandling.IDataSource>();
    
    protected HP.ST.Fwk.RunTimeFWK.DataHandling.IDataSource GetDataSource(string dataSourceName)
    {
    if(!dataSourceNameToDataSource.ContainsKey(dataSourceName))
    	throw new Exception(("A data source with the specified name does not exist."));
    return dataSourceNameToDataSource[dataSourceName];
    }
    public HP.ST.Ext.BasicActivities.DataFetchActivity DataFetchActivity22 = null;
    public HP.ST.Ext.BasicActivities.DataFetchActivity DataFetchActivity19 = null;
    public HP.ST.Ext.BasicActivities.DataFetchActivity DataFetchActivity16 = null;
    public HP.ST.Ext.BasicActivities.StartActivity StartActivity1 = null;
    public HP.ST.Fwk.RunTimeFWK.CompositeActivities.Loop<Loop2Input> Loop2 = null;
    public HP.ST.Ext.BasicActivities.DataExporterActivity DataExporterActivity18 = null;
    public HP.ST.Ext.BasicActivities.DataExporterActivity DataExporterActivity21 = null;
    public HP.ST.Ext.BasicActivities.DataExporterActivity DataExporterActivity24 = null;
    public HP.ST.Ext.BasicActivities.DataExporterCloseActivity DataExporterCloseActivity25 = null;
    public HP.ST.Ext.BasicActivities.EndActivity EndActivity3 = null;
    public HP.ST.Ext.BasicActivities.DataDisconnectActivity DataDisconnectActivity17 = null;
    public HP.ST.Ext.BasicActivities.DataDisconnectActivity DataDisconnectActivity20 = null;
    public HP.ST.Ext.BasicActivities.DataDisconnectActivity DataDisconnectActivity23 = null;
    public HP.ST.Fwk.RunTimeFWK.CompositeActivities.Sequence Sequence15 = null;
    public HP.ST.Ext.WebServicesActivities.StServiceCallActivity StServiceCallActivity7 = null;
    public HP.ST.Ext.WebServicesActivities.StServiceCallActivity StServiceCallActivity9 = null;
    public HP.ST.Ext.WebServicesActivities.StServiceCallActivity StServiceCallActivity10 = null;
    public HP.ST.Ext.WebServicesActivities.StServiceCallActivity StServiceCallActivity8 = null;
    public HP.ST.Ext.WebServicesActivities.StServiceCallActivity StServiceCallActivity11 = null;
    
    }
    
    }
    