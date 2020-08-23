import json
import boto3
from fuzzywuzzy import fuzz

def sim(Str1,Str2):
    return fuzz.token_set_ratio(Str1,Str2)

def lambda_handler(event, context):
    # TODO implement
    dynamodb = boto3.client('dynamodb')
    paginator = dynamodb.get_paginator("scan")
    stories=[]
    count=0
    for page in paginator.paginate(TableName='stories'):
        #yield from page["story"]
        #l.extend(page['Items'])
        for i in page['Items']:
            stories.append(i['story']['S'])
        count+=page['Count']
                
    if event['data']['method']=='add':
        story= event['data']['story']
        dynamodb.put_item(TableName='stories', Item={'id':{'S':str(count)},'story':{'S':story}})
        stories.append(story)
        return {
            'statusCode': 200,
            'body': {k:v for k,v in enumerate(stories)}
        }
    else:
        sym= event['data']['story']
        
        out=''
        temp=0
        for i in stories:
            per=sim(i,sym)
            if per>temp:
                out=i
                temp=per
        js= {'0':out}        
        return {
            'statusCode': 200,
            'body': js
        }