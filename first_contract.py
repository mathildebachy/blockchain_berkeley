# Store Value - Example for illustrative purposes only.

import smartpy as sp


class document(sp.Contract):
    def __init__(self
                #dates
                , date_valid_from
                , date_valid_to
                #doc
                , doc_type
                , doc_characteristics
                , doc_description_level1
                , doc_description_level2
                #owner
                , owner_name
                , owner_address
                #certifier
                , certifier_name
                , certifier_address ):
        self.init(date_last_update=sp.timestamp_from_utc_now()
                , date_issued=sp.timestamp_from_utc_now()
                , date_valid_from=date_valid_from
                , date_valid_to=date_valid_to
                , doc_type=doc_type
                , doc_status='pending'
                , doc_characteristics=doc_characteristics
                , doc_description_level1=doc_description_level1
                , doc_description_level2=doc_description_level2
                , owner_name=owner_name
                , owner_address=owner_address
                , certifier_name=certifier_name
                , certifier_address=certifier_address)

    @sp.entry_point
    def replace_issuance_date(self, params):
        self.data.date_issued = params
    
    #@sp.entry_point
    #def replace(self, params):
    #    self.data.storedValue = params.value
    
    #@sp.entry_point
    #def double(self, params):
    #    self.data.storedValue *= 2

    #@sp.entry_point
    #def divide(self, params):
    #   sp.verify(params.divisor > 5)
    #    self.data.storedValue /= params.divisor

if "templates" not in __name__:
    @sp.add_test(name = "first contract")
    def test():
        scenario = sp.test_scenario()
        scenario.h1('A first contract')
        scenario.h2('Initiate contract')
        doc_1 = document(
                sp.timestamp_from_utc_now()
                , sp.timestamp_from_utc_now()
                #doc
                , 'Degree'
                , 'Master'
                , 'IEOR'
                , ''
                #owner
                , 'alice'
                , 'adadada'
                #certifier
                , 'bob'
                , 'bobobob' )
        scenario += doc_1
        scenario.h2('Change issuance date')
        new_timestamp=sp.timestamp_from_utc_now().add_seconds(10)
        scenario+= doc_1.replace_issuance_date(new_timestamp)
        
        