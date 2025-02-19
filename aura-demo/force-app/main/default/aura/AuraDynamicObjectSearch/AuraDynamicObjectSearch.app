<aura:application extends="force:slds">
    
    
    <!-- 
        attributes (variables) that we will work with 
            data types: 
                https://developer.salesforce.com/docs/atlas.en-us.lightning.meta/lightning/ref_attr_types_basic.htm
                https://developer.salesforce.com/docs/atlas.en-us.lightning.meta/lightning/ref_attr_types_collection.htm    
    -->
    <aura:attribute name="selectedObject" type="String" />
    <aura:attribute name="selectedFields" type="String[]" />

    <!-- init function uses "this" to reference the component itself -->
    <aura:handler 
        name="init" 
        value="{! this }" 
        action="{! c.init }" 
    />

    <!-- object search event handler -->
    <aura:handler 
        name="objectSearchEvent" 
        event="c:AuraDynamicObjectSearchEvent" 
        action="{! c.handleEvent }"
    />


    <lightning:layout class="slds-m-around_medium">
        
        <lightning:layoutItem size="6" class="slds-var-p-around_small" >
            <c:auraObjectSelector />
        </lightning:layoutItem>
        
        <!-- renders what's inside the if tags when the condition is true -->
        <aura:if isTrue="{! not(empty(v.selectedFields)) }" >
            <lightning:layoutItem size="6" class="slds-var-p-around_small" >
                
                <!-- passing selected object and fields to child component through props -->
                <c:auraDynamicObjectSearchResults 
                    selectedObject="{! v.selectedObject }" 
                    selectedFields="{! v.selectedFields }" 
                />
            </lightning:layoutItem>
        </aura:if>
        
        
    </lightning:layout>
    


</aura:application>