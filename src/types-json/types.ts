import { IJSON } from "./types.d";

export const JSON: IJSON =  {
	"id": 0,
	"name": "tsCommentToMarkdownTable",
	"kind": 0,
	"flags": {},
	"originalName": "",
	"children": [
		{
			"id": 1,
			"name": "exampleA",
			"kind": 1,
			"kindString": "Module",
			"flags": {},
			"children": [
				{
					"id": 17,
					"name": "State",
					"kind": 4,
					"kindString": "Enumeration",
					"flags": {},
					"comment": {
						"tags": [
							{
								"tag": "desc",
								"text": "枚举的 Exp\n"
							}
						]
					},
					"children": [
						{
							"id": 18,
							"name": "STATUS",
							"kind": 16,
							"kindString": "Enumeration member",
							"flags": {},
							"comment": {
								"tags": [
									{
										"tag": "desc",
										"text": "STATUS 的描述\n"
									}
								]
							},
							"sources": [
								{
									"fileName": "exampleA.ts",
									"line": 42,
									"character": 8
								}
							],
							"defaultValue": "\"status\""
						},
						{
							"id": 19,
							"name": "WHAT",
							"kind": 16,
							"kindString": "Enumeration member",
							"flags": {},
							"comment": {
								"tags": [
									{
										"tag": "desc",
										"text": "WHAT？\n"
									}
								]
							},
							"sources": [
								{
									"fileName": "exampleA.ts",
									"line": 47,
									"character": 6
								}
							],
							"defaultValue": "\"what\""
						}
					],
					"groups": [
						{
							"title": "Enumeration members",
							"kind": 16,
							"children": [
								18,
								19
							]
						}
					],
					"sources": [
						{
							"fileName": "exampleA.ts",
							"line": 38,
							"character": 17
						}
					]
				},
				{
					"id": 2,
					"name": "IExample",
					"kind": 256,
					"kindString": "Interface",
					"flags": {},
					"comment": {
						"tags": [
							{
								"tag": "name",
								"text": "示例"
							},
							{
								"tag": "desc",
								"text": "这时一段示例的描述\n"
							}
						]
					},
					"children": [
						{
							"id": 3,
							"name": "demo",
							"kind": 1024,
							"kindString": "Property",
							"flags": {},
							"comment": {
								"tags": [
									{
										"tag": "desc",
										"text": "DEMO desc"
									},
									{
										"tag": "returns",
										"text": ""
									},
									{
										"tag": "example",
										"text": "\n     demo().then((v) => {\n         console.log(v)\n     });\n"
									}
								]
							},
							"sources": [
								{
									"fileName": "exampleA.ts",
									"line": 14,
									"character": 6
								}
							],
							"type": {
								"type": "reflection",
								"declaration": {
									"id": 4,
									"name": "__type",
									"kind": 65536,
									"kindString": "Type literal",
									"flags": {},
									"signatures": [
										{
											"id": 5,
											"name": "__type",
											"kind": 4096,
											"kindString": "Call signature",
											"flags": {},
											"type": {
												"type": "reference",
												"typeArguments": [
													{
														"type": "reference",
														"id": 17,
														"name": "State"
													}
												],
												"name": "Promise"
											}
										}
									]
								}
							}
						},
						{
							"id": 6,
							"name": "demoChange",
							"kind": 1024,
							"kindString": "Property",
							"flags": {},
							"comment": {
								"tags": [
									{
										"tag": "desc",
										"text": "改变 DEMO"
									},
									{
										"tag": "param",
										"text": "回调",
										"param": "callback"
									},
									{
										"tag": "returns",
										"text": "DEMO 数字"
									},
									{
										"tag": "example",
										"text": "\n     let mock = demoChange((callback: State) => {\n         console.log(callback)\n     });\n"
									}
								]
							},
							"sources": [
								{
									"fileName": "exampleA.ts",
									"line": 24,
									"character": 12
								}
							],
							"type": {
								"type": "reflection",
								"declaration": {
									"id": 7,
									"name": "__type",
									"kind": 65536,
									"kindString": "Type literal",
									"flags": {},
									"signatures": [
										{
											"id": 8,
											"name": "__type",
											"kind": 4096,
											"kindString": "Call signature",
											"flags": {},
											"parameters": [
												{
													"id": 9,
													"name": "callback",
													"kind": 32768,
													"kindString": "Parameter",
													"flags": {},
													"type": {
														"type": "reflection",
														"declaration": {
															"id": 10,
															"name": "__type",
															"kind": 65536,
															"kindString": "Type literal",
															"flags": {},
															"signatures": [
																{
																	"id": 11,
																	"name": "__type",
																	"kind": 4096,
																	"kindString": "Call signature",
																	"flags": {},
																	"parameters": [
																		{
																			"id": 12,
																			"name": "v",
																			"kind": 32768,
																			"kindString": "Parameter",
																			"flags": {},
																			"type": {
																				"type": "reference",
																				"id": 17,
																				"name": "State"
																			}
																		}
																	],
																	"type": {
																		"type": "intrinsic",
																		"name": "void"
																	}
																}
															]
														}
													}
												}
											],
											"type": {
												"type": "intrinsic",
												"name": "number"
											}
										}
									]
								}
							}
						},
						{
							"id": 13,
							"name": "demoStatus",
							"kind": 1024,
							"kindString": "Property",
							"flags": {},
							"comment": {
								"tags": [
									{
										"tag": "desc",
										"text": "DEMO 状态"
									},
									{
										"tag": "param",
										"text": "入参",
										"param": "v"
									},
									{
										"tag": "returns",
										"text": "无"
									},
									{
										"tag": "example",
										"text": "\n     demoStatus(v);\n"
									}
								]
							},
							"sources": [
								{
									"fileName": "exampleA.ts",
									"line": 32,
									"character": 12
								}
							],
							"type": {
								"type": "reflection",
								"declaration": {
									"id": 14,
									"name": "__type",
									"kind": 65536,
									"kindString": "Type literal",
									"flags": {},
									"signatures": [
										{
											"id": 15,
											"name": "__type",
											"kind": 4096,
											"kindString": "Call signature",
											"flags": {},
											"parameters": [
												{
													"id": 16,
													"name": "v",
													"kind": 32768,
													"kindString": "Parameter",
													"flags": {},
													"type": {
														"type": "union",
														"types": [
															{
																"type": "intrinsic",
																"name": "number"
															},
															{
																"type": "reference",
																"id": 2,
																"name": "IExample"
															}
														]
													}
												}
											],
											"type": {
												"type": "intrinsic",
												"name": "void"
											}
										}
									]
								}
							}
						}
					],
					"groups": [
						{
							"title": "Properties",
							"kind": 1024,
							"children": [
								3,
								6,
								13
							]
						}
					],
					"sources": [
						{
							"fileName": "exampleA.ts",
							"line": 5,
							"character": 25
						}
					]
				}
			],
			"groups": [
				{
					"title": "Enumerations",
					"kind": 4,
					"children": [
						17
					]
				},
				{
					"title": "Interfaces",
					"kind": 256,
					"children": [
						2
					]
				}
			],
			"sources": [
				{
					"fileName": "exampleA.ts",
					"line": 1,
					"character": 0
				}
			]
		},
		{
			"id": 20,
			"name": "exampleB",
			"kind": 1,
			"kindString": "Module",
			"flags": {},
			"children": [
				{
					"id": 36,
					"name": "IENUM",
					"kind": 4,
					"kindString": "Enumeration",
					"flags": {},
					"comment": {
						"shortText": "这是一个枚举"
					},
					"children": [
						{
							"id": 39,
							"name": "E",
							"kind": 16,
							"kindString": "Enumeration member",
							"flags": {},
							"sources": [
								{
									"fileName": "exampleB.ts",
									"line": 48,
									"character": 3
								}
							],
							"defaultValue": "\"e\""
						},
						{
							"id": 37,
							"name": "Q",
							"kind": 16,
							"kindString": "Enumeration member",
							"flags": {},
							"sources": [
								{
									"fileName": "exampleB.ts",
									"line": 46,
									"character": 3
								}
							],
							"defaultValue": "\"q\""
						},
						{
							"id": 40,
							"name": "R",
							"kind": 16,
							"kindString": "Enumeration member",
							"flags": {},
							"sources": [
								{
									"fileName": "exampleB.ts",
									"line": 49,
									"character": 3
								}
							],
							"defaultValue": "\"r\""
						},
						{
							"id": 38,
							"name": "W",
							"kind": 16,
							"kindString": "Enumeration member",
							"flags": {},
							"sources": [
								{
									"fileName": "exampleB.ts",
									"line": 47,
									"character": 3
								}
							],
							"defaultValue": "\"w\""
						}
					],
					"groups": [
						{
							"title": "Enumeration members",
							"kind": 16,
							"children": [
								39,
								37,
								40,
								38
							]
						}
					],
					"sources": [
						{
							"fileName": "exampleB.ts",
							"line": 45,
							"character": 17
						}
					]
				},
				{
					"id": 33,
					"name": "IFeature",
					"kind": 256,
					"kindString": "Interface",
					"flags": {},
					"comment": {
						"tags": [
							{
								"tag": "desc",
								"text": "假装一个 feature\n"
							}
						]
					},
					"children": [
						{
							"id": 34,
							"name": "X",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isOptional": true
							},
							"comment": {
								"tags": [
									{
										"tag": "desc",
										"text": "埃克斯"
									},
									{
										"tag": "tips",
										"text": "大杂烩（这是一个特殊 @ 标签）\n"
									}
								]
							},
							"sources": [
								{
									"fileName": "exampleB.ts",
									"line": 33,
									"character": 3
								}
							],
							"type": {
								"type": "union",
								"types": [
									{
										"type": "intrinsic",
										"name": "string"
									},
									{
										"type": "intrinsic",
										"name": "number"
									},
									{
										"type": "intrinsic",
										"name": "symbol"
									}
								]
							}
						},
						{
							"id": 35,
							"name": "Y",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isOptional": true
							},
							"comment": {
								"tags": [
									{
										"tag": "desc",
										"text": "<b>Description</b>"
									},
									{
										"tag": "tips",
										"text": "提醒\n"
									}
								]
							},
							"sources": [
								{
									"fileName": "exampleB.ts",
									"line": 39,
									"character": 3
								}
							],
							"type": {
								"type": "reference",
								"id": 36,
								"name": "IENUM"
							}
						}
					],
					"groups": [
						{
							"title": "Properties",
							"kind": 1024,
							"children": [
								34,
								35
							]
						}
					],
					"sources": [
						{
							"fileName": "exampleB.ts",
							"line": 28,
							"character": 25
						}
					]
				},
				{
					"id": 21,
					"name": "IFunction",
					"kind": 256,
					"kindString": "Interface",
					"flags": {},
					"comment": {
						"tags": [
							{
								"tag": "name",
								"text": "假装是一个功能"
							},
							{
								"tag": "desc",
								"text": "假装是功能的描述\n"
							}
						]
					},
					"children": [
						{
							"id": 22,
							"name": "A",
							"kind": 1024,
							"kindString": "Property",
							"flags": {},
							"comment": {
								"tags": [
									{
										"tag": "desc",
										"text": "功能 A"
									},
									{
										"tag": "param",
										"text": "功能 A 入参",
										"param": "a"
									},
									{
										"tag": "returns",
										"text": "无"
									},
									{
										"tag": "example",
										"text": "\n     A();\n"
									}
								]
							},
							"sources": [
								{
									"fileName": "exampleB.ts",
									"line": 13,
									"character": 3
								}
							],
							"type": {
								"type": "reflection",
								"declaration": {
									"id": 23,
									"name": "__type",
									"kind": 65536,
									"kindString": "Type literal",
									"flags": {},
									"signatures": [
										{
											"id": 24,
											"name": "__type",
											"kind": 4096,
											"kindString": "Call signature",
											"flags": {},
											"parameters": [
												{
													"id": 25,
													"name": "a",
													"kind": 32768,
													"kindString": "Parameter",
													"flags": {
														"isOptional": true
													},
													"type": {
														"type": "reference",
														"id": 33,
														"name": "IFeature"
													}
												}
											],
											"type": {
												"type": "intrinsic",
												"name": "void"
											}
										}
									]
								}
							}
						},
						{
							"id": 26,
							"name": "B",
							"kind": 1024,
							"kindString": "Property",
							"flags": {},
							"comment": {
								"tags": [
									{
										"tag": "desc",
										"text": "功能 B"
									},
									{
										"tag": "param",
										"text": "回调函数",
										"param": "callback"
									},
									{
										"tag": "returns",
										"text": "无"
									},
									{
										"tag": "example",
										"text": "\n     B((param) => console.log(\"-> %s\"， param));\n"
									}
								]
							},
							"sources": [
								{
									"fileName": "exampleB.ts",
									"line": 22,
									"character": 3
								}
							],
							"type": {
								"type": "reflection",
								"declaration": {
									"id": 27,
									"name": "__type",
									"kind": 65536,
									"kindString": "Type literal",
									"flags": {},
									"signatures": [
										{
											"id": 28,
											"name": "__type",
											"kind": 4096,
											"kindString": "Call signature",
											"flags": {},
											"parameters": [
												{
													"id": 29,
													"name": "callback",
													"kind": 32768,
													"kindString": "Parameter",
													"flags": {},
													"type": {
														"type": "reflection",
														"declaration": {
															"id": 30,
															"name": "__type",
															"kind": 65536,
															"kindString": "Type literal",
															"flags": {},
															"signatures": [
																{
																	"id": 31,
																	"name": "__type",
																	"kind": 4096,
																	"kindString": "Call signature",
																	"flags": {},
																	"parameters": [
																		{
																			"id": 32,
																			"name": "param",
																			"kind": 32768,
																			"kindString": "Parameter",
																			"flags": {},
																			"type": {
																				"type": "intrinsic",
																				"name": "string"
																			}
																		}
																	],
																	"type": {
																		"type": "intrinsic",
																		"name": "void"
																	}
																}
															]
														}
													}
												}
											],
											"type": {
												"type": "intrinsic",
												"name": "void"
											}
										}
									]
								}
							}
						}
					],
					"groups": [
						{
							"title": "Properties",
							"kind": 1024,
							"children": [
								22,
								26
							]
						}
					],
					"sources": [
						{
							"fileName": "exampleB.ts",
							"line": 5,
							"character": 26
						}
					]
				}
			],
			"groups": [
				{
					"title": "Enumerations",
					"kind": 4,
					"children": [
						36
					]
				},
				{
					"title": "Interfaces",
					"kind": 256,
					"children": [
						33,
						21
					]
				}
			],
			"sources": [
				{
					"fileName": "exampleB.ts",
					"line": 1,
					"character": 0
				}
			]
		}
	],
	"groups": [
		{
			"title": "Modules",
			"kind": 1,
			"children": [
				1,
				20
			]
		}
	]
}