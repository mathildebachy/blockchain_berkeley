import smartpy as sp

class document(sp.Contract):
    def __init__(self
                , date_of_birth
                , doc_description
                , doc_type
                , graduation_year
                , send_to
                , student_first_name
                , student_last_name
                , student_school_name
                ):
        
        self.init(date_of_birth=date_of_birth
                , doc_description=doc_description
                , doc_status='pending'
                , doc_type=doc_type
                , graduation_year=graduation_year
                , send_to=send_to
                , student_first_name=student_first_name
                , student_last_name=student_last_name
                , student_school_name=student_school_name
                )

    @sp.entry_point
    def update_status(self, status):
        self.data.doc_status = status
    
    @sp.entry_point
    def add_destination(self, destination):
        self.data.send_to.push(destination)
    
    @sp.entry_point
    def update_destination(self, destinations):
        self.data.send_to=destinations
    
    @sp.entry_point
    def update_description(self, description):
        self.data.doc_description = description


if "templates" not in __name__:
    @sp.add_test(name = "first contract")
    def test():
        scenario = sp.test_scenario()
        scenario.h1('A first contract')
        scenario.h2('Initiate contract')
        doc_1 = document(
                student_first_name='Mathilde'
                , student_last_name='Bachy'
                , date_of_birth='11/20/1997'
                , student_school_name='Berkeley'
                #doc
                , doc_type='Transcript'
                , doc_description='Fall and Spring transcripts'
                , graduation_year='2021'
                #destination (universities)
                , send_to=['Centrale Paris']
                )
        scenario += doc_1
        
        scenario.h2('Update status')
        scenario+= doc_1.update_status('approved')
        scenario+= doc_1.add_destination('Supelec')
        
        