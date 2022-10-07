const a = {
    "name" : "Amar",
    "regNo" : 20010458,
    "batch" : 2020,
    "section" : "C",
    "degree" : "BE-CSE",
    "password" : "hicet",
    "feedback" : [
        {
            "semester" : "V",
            "isFeedBackSubmitted" : false
        }
    ],
    "subjects" : {
        "include" : [
            {
                "subjectCode" : "19CS3322",
                "subjectName" : "CS for Nobody",
                "faculty" : "JD"
            }
        ],
        "exclude" : [
            {
                "subjectCode" : "19CS3321",
                "subjectName" : "CS for Everybody",
                "faculty" : "JD"
            }
        ]
    }
}

const b = {
    "$schema": "https://json-schema.org/draft/2019-09/schema",
    "$id": "http://example.com/example.json",
    "type": "object",
    "title": "Root Schema",
    "required": [
        "name",
        "regNo",
        "batch",
        "section",
        "degree",
        "password",
        "feedback",
        "subjects"
    ],
    "properties": {
        "name": {
            "type": "string",
            "default": "",
            "title": "The name Schema",
            "examples": [
                "Amar"
            ]
        },
        "regNo": {
            "type": "integer",
            "default": 0,
            "title": "The regNo Schema",
            "examples": [
                20010458
            ]
        },
        "batch": {
            "type": "integer",
            "default": 0,
            "title": "The batch Schema",
            "examples": [
                2020
            ]
        },
        "section": {
            "type": "string",
            "default": "",
            "title": "The section Schema",
            "examples": [
                "C"
            ]
        },
        "degree": {
            "type": "string",
            "default": "",
            "title": "The degree Schema",
            "examples": [
                "BE-CSE"
            ]
        },
        "password": {
            "type": "string",
            "default": "",
            "title": "The password Schema",
            "examples": [
                "hicet"
            ]
        },
        "feedback": {
            "type": "array",
            "default": [],
            "title": "The feedback Schema",
            "items": {
                "type": "object",
                "default": {},
                "title": "A Schema",
                "required": [
                    "semester",
                    "isFeedBackSubmitted"
                ],
                "properties": {
                    "semester": {
                        "type": "string",
                        "default": "",
                        "title": "The semester Schema",
                        "examples": [
                            "V"
                        ]
                    },
                    "isFeedBackSubmitted": {
                        "type": "boolean",
                        "default": false,
                        "title": "The isFeedBackSubmitted Schema",
                        "examples": [
                            false
                        ]
                    }
                },
                "examples": [{
                    "semester": "V",
                    "isFeedBackSubmitted": false
                }]
            },
            "examples": [
                [{
                    "semester": "V",
                    "isFeedBackSubmitted": false
                }]
            ]
        },
        "subjects": {
            "type": "object",
            "default": {},
            "title": "The subjects Schema",
            "required": [
                "include",
                "exclude"
            ],
            "properties": {
                "include": {
                    "type": "array",
                    "default": [],
                    "title": "The include Schema",
                    "items": {
                        "type": "object",
                        "default": {},
                        "title": "A Schema",
                        "required": [
                            "subjectCode",
                            "subjectName",
                            "faculty"
                        ],
                        "properties": {
                            "subjectCode": {
                                "type": "string",
                                "default": "",
                                "title": "The subjectCode Schema",
                                "examples": [
                                    "19CS3322"
                                ]
                            },
                            "subjectName": {
                                "type": "string",
                                "default": "",
                                "title": "The subjectName Schema",
                                "examples": [
                                    "CS for Nobody"
                                ]
                            },
                            "faculty": {
                                "type": "string",
                                "default": "",
                                "title": "The faculty Schema",
                                "examples": [
                                    "JD"
                                ]
                            }
                        },
                        "examples": [{
                            "subjectCode": "19CS3322",
                            "subjectName": "CS for Nobody",
                            "faculty": "JD"
                        }]
                    },
                    "examples": [
                        [{
                            "subjectCode": "19CS3322",
                            "subjectName": "CS for Nobody",
                            "faculty": "JD"
                        }]
                    ]
                },
                "exclude": {
                    "type": "array",
                    "default": [],
                    "title": "The exclude Schema",
                    "items": {
                        "type": "object",
                        "default": {},
                        "title": "A Schema",
                        "required": [
                            "subjectCode",
                            "subjectName",
                            "faculty"
                        ],
                        "properties": {
                            "subjectCode": {
                                "type": "string",
                                "default": "",
                                "title": "The subjectCode Schema",
                                "examples": [
                                    "19CS3321"
                                ]
                            },
                            "subjectName": {
                                "type": "string",
                                "default": "",
                                "title": "The subjectName Schema",
                                "examples": [
                                    "CS for Everybody"
                                ]
                            },
                            "faculty": {
                                "type": "string",
                                "default": "",
                                "title": "The faculty Schema",
                                "examples": [
                                    "JD"
                                ]
                            }
                        },
                        "examples": [{
                            "subjectCode": "19CS3321",
                            "subjectName": "CS for Everybody",
                            "faculty": "JD"
                        }]
                    },
                    "examples": [
                        [{
                            "subjectCode": "19CS3321",
                            "subjectName": "CS for Everybody",
                            "faculty": "JD"
                        }]
                    ]
                }
            },
            "examples": [{
                "include": [{
                    "subjectCode": "19CS3322",
                    "subjectName": "CS for Nobody",
                    "faculty": "JD"
                }],
                "exclude": [{
                    "subjectCode": "19CS3321",
                    "subjectName": "CS for Everybody",
                    "faculty": "JD"
                }]
            }]
        }
    },
    "examples": [{
        "name": "Amar",
        "regNo": 20010458,
        "batch": 2020,
        "section": "C",
        "degree": "BE-CSE",
        "password": "hicet",
        "feedback": [{
            "semester": "V",
            "isFeedBackSubmitted": false
        }],
        "subjects": {
            "include": [{
                "subjectCode": "19CS3322",
                "subjectName": "CS for Nobody",
                "faculty": "JD"
            }],
            "exclude": [{
                "subjectCode": "19CS3321",
                "subjectName": "CS for Everybody",
                "faculty": "JD"
            }]
        }
    }]
}