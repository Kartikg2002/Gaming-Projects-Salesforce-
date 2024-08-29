public with sharing class AccountContactService {

    // update active contacts count
    public static void updateActiveContacts(Set<Id> accountIds){
        Map<Id,Account> accsToUpdate = new Map<Id,Account>();
  
            for(AggregateResult result : [SELECT AccountId, COUNT(Id) totalContact FROM Contact WHERE Active__c = true AND AccountId IN :accountIdS GROUP BY AccountId]){

            String accId = String.valueOf(result.get('AccountId'));
            Integer totalContact = Integer.valueOf(result.get('totalContact'));

            Account acc = new Account();
            acc.Id = accId;
            acc.Active_Contacts__c =totalContact;

            accsToUpdate.put(accId,acc);

            }

            //Update accounts with zero active contacts
            for(Id accId : accountIds){
                if(!accsToUpdate.containsKey(accId)){
                     accsToUpdate.put(accId, new Account(Id=accId, Active_Contacts__c=0));
                }
            }

            update accsToUpdate.values();
    }
}