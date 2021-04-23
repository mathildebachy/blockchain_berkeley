export const smartContractJSONfile = 
[
  {
    "prim": "storage",
    "args": [
      {
        "prim": "pair",
        "args": [
          {
            "prim": "pair",
            "args": [
              { "prim": "pair", "args": [ { "prim": "string", "annots": [ "%date_of_birth" ] }, { "prim": "string", "annots": [ "%doc_description" ] } ] },
              {
                "prim": "pair",
                "args": [
                  { "prim": "string", "annots": [ "%doc_status" ] },
                  { "prim": "pair", "args": [ { "prim": "string", "annots": [ "%doc_type" ] }, { "prim": "list", "args": [ { "prim": "string" } ], "annots": [ "%doc_url" ] } ] }
                ]
              }
            ]
          },
          {
            "prim": "pair",
            "args": [
              {
                "prim": "pair",
                "args": [ { "prim": "string", "annots": [ "%graduation_year" ] }, { "prim": "list", "args": [ { "prim": "string" } ], "annots": [ "%send_to" ] } ]
              },
              {
                "prim": "pair",
                "args": [
                  { "prim": "string", "annots": [ "%student_first_name" ] },
                  { "prim": "pair", "args": [ { "prim": "string", "annots": [ "%student_last_name" ] }, { "prim": "string", "annots": [ "%student_school_name" ] } ] }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "prim": "parameter",
    "args": [
      {
        "prim": "or",
        "args": [
          {
            "prim": "or",
            "args": [
              { "prim": "string", "annots": [ "%add_destination" ] },
              { "prim": "or", "args": [ { "prim": "string", "annots": [ "%add_doc_url" ] }, { "prim": "unit", "annots": [ "%init_doc_url" ] } ] }
            ]
          },
          {
            "prim": "or",
            "args": [
              { "prim": "string", "annots": [ "%update_description" ] },
              {
                "prim": "or",
                "args": [ { "prim": "list", "args": [ { "prim": "string" } ], "annots": [ "%update_destination" ] }, { "prim": "string", "annots": [ "%update_status" ] } ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "prim": "code",
    "args": [
      [
        { "prim": "UNPAIR" },
        {
          "prim": "IF_LEFT",
          "args": [
            [
              {
                "prim": "IF_LEFT",
                "args": [
                  [
                    { "prim": "SWAP" },
                    { "prim": "DUP" },
                    { "prim": "DUG", "args": [ { "int": "2" } ] },
                    { "prim": "UNPAIR" },
                    { "prim": "SWAP" },
                    { "prim": "UNPAIR" },
                    { "prim": "CAR" },
                    { "prim": "DIG", "args": [ { "int": "4" } ] },
                    { "prim": "GET", "args": [ { "int": "3" } ] },
                    { "prim": "CDR" },
                    { "prim": "DIG", "args": [ { "int": "4" } ] },
                    { "prim": "CONS" },
                    { "prim": "SWAP" },
                    { "prim": "PAIR" },
                    { "prim": "PAIR" },
                    { "prim": "SWAP" },
                    { "prim": "PAIR" }
                  ],
                  [
                    {
                      "prim": "IF_LEFT",
                      "args": [
                        [
                          { "prim": "SWAP" },
                          { "prim": "DUP" },
                          { "prim": "DUG", "args": [ { "int": "2" } ] },
                          { "prim": "UNPAIR" },
                          { "prim": "UNPAIR" },
                          { "prim": "SWAP" },
                          { "prim": "UNPAIR" },
                          { "prim": "SWAP" },
                          { "prim": "CAR" },
                          { "prim": "DIG", "args": [ { "int": "5" } ] },
                          { "prim": "CAR" },
                          { "prim": "GET", "args": [ { "int": "6" } ] },
                          { "prim": "DIG", "args": [ { "int": "5" } ] },
                          { "prim": "CONS" },
                          { "prim": "SWAP" },
                          { "prim": "PAIR" },
                          { "prim": "SWAP" },
                          { "prim": "PAIR" },
                          { "prim": "SWAP" },
                          { "prim": "PAIR" },
                          { "prim": "PAIR" }
                        ],
                        [
                          { "prim": "DROP" },
                          { "prim": "UNPAIR" },
                          { "prim": "UNPAIR" },
                          { "prim": "SWAP" },
                          { "prim": "UNPAIR" },
                          { "prim": "SWAP" },
                          { "prim": "CAR" },
                          { "prim": "NIL", "args": [ { "prim": "string" } ] },
                          { "prim": "SWAP" },
                          { "prim": "PAIR" },
                          { "prim": "SWAP" },
                          { "prim": "PAIR" },
                          { "prim": "SWAP" },
                          { "prim": "PAIR" },
                          { "prim": "PAIR" }
                        ]
                      ]
                    }
                  ]
                ]
              }
            ],
            [
              {
                "prim": "IF_LEFT",
                "args": [
                  [
                    { "prim": "SWAP" },
                    { "prim": "UNPAIR" },
                    { "prim": "UNPAIR" },
                    { "prim": "CAR" },
                    { "prim": "DIG", "args": [ { "int": "3" } ] },
                    { "prim": "SWAP" },
                    { "prim": "PAIR" },
                    { "prim": "PAIR" },
                    { "prim": "PAIR" }
                  ],
                  [
                    {
                      "prim": "IF_LEFT",
                      "args": [
                        [
                          { "prim": "SWAP" },
                          { "prim": "UNPAIR" },
                          { "prim": "SWAP" },
                          { "prim": "UNPAIR" },
                          { "prim": "CAR" },
                          { "prim": "DIG", "args": [ { "int": "3" } ] },
                          { "prim": "SWAP" },
                          { "prim": "PAIR" },
                          { "prim": "PAIR" },
                          { "prim": "SWAP" },
                          { "prim": "PAIR" }
                        ],
                        [
                          { "prim": "SWAP" },
                          { "prim": "UNPAIR" },
                          { "prim": "UNPAIR" },
                          { "prim": "SWAP" },
                          { "prim": "CDR" },
                          { "prim": "DIG", "args": [ { "int": "3" } ] },
                          { "prim": "PAIR" },
                          { "prim": "SWAP" },
                          { "prim": "PAIR" },
                          { "prim": "PAIR" }
                        ]
                      ]
                    }
                  ]
                ]
              }
            ]
          ]
        },
        { "prim": "NIL", "args": [ { "prim": "operation" } ] },
        { "prim": "PAIR" }
      ]
    ]
  }
]