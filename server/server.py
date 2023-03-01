from re import I
from flask import Flask, request
import hashlib
from bson.objectid import ObjectId
from flask_pymongo import PyMongo
from flask_cors import CORS
import os
import selenium
from PIL import Image
from selenium import webdriver
import time
import io
import requests
from webdriver_manager.chrome import ChromeDriverManager
from selenium.common.exceptions import ElementClickInterceptedException


options = webdriver.ChromeOptions()
options.add_argument('--ignore-certificate-errors')
options.add_argument('--incognito')
options.add_argument('--headless')

driver = webdriver.Chrome(
    "/usr/lib/chromium-browser/chromedriver", chrome_options=options)


app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb://localhost:27017/tkt"
mongo = PyMongo(app)
CORS(app)


@app.route("/create-user", methods=['POST'])
def create():
    print("creating user")
    firstname = request.json['firstname']
    lastname = request.json['lastname']
    email = request.json['email']
    mobile = request.json['mobile']
    passkey = request.json['passkey']

    password = hashlib.sha1(passkey.encode()).hexdigest()
    if (firstname and lastname and email and mobile and password):
        print("in if-block")
        mongo.db.users.insert_one(
            {'firstname': firstname, "lastname": lastname, "email": email, "password": password, "mobile": mobile, "balance": 5000})
        print("shayad inserted")
        return {
            "status": True,
            "msg": "inserted"
        }
    else:
        return {
            "status": False,
            "msg": "not inserted"
        }


@app.route("/cities", methods=["POST"])
def cities():
    print("cities1")
    src = "mumbai"
    destination = "pune"
    driver.get("https://www.zingbus.com/bus-tickets/agra-to-mathura-bus-route?date=2022-10-26")


@app.route('/pay', methods=['POST'])
def pay():
    print("payment1")
    body = request.json
    amount = body['amount']

    id = ObjectId(body['id'])

    record = mongo.db.users.find_one({"_id": id})
    print(record)
    if (record):
        balance = record["balance"]
        print(balance, " : is the balance in the account")
        if (balance >= amount):
            print("sufficient balance")
            newbalance = balance - amount
            mongo.db.users.update_one(
                {"_id": id}, {"$set": {"balance": newbalance}}, upsert=True)
            print("i think updated")
            return {
                "status": True, "msg": "enough bal"
            }
        else:
            print("balance not enough")
            return {
                "status": False, "msg": "not enough bal"
            }
    else:
        print("user with that id not found")
        return {
            "status": False, "msg": "user not found"
        }


@app.route("/login", methods=["POST"])
def login():
    email = "ruturajpandav18@gmail.com"
    password = "Rxcd8ki@123"
    record = mongo.db.users.find_one({"email": email})
    if (record):
        record_password = record["password"]
        if (hashlib.sha1(password.encode()).hexdigest() == record_password):
            print("password matches")
            # grant login
        else:
            print("record password : ", record_password)
            print(" password : ", hashlib.sha1(password.encode()).hexdigest())
            print("password does not match")
    else:
        print("email not found")

    print("THIS RECORD FOUND")
    print(record)
    print("/login")
    return {
        "status": "ok", "msg": "on login page"
    }


@app.route('/home', methods=['GET'])
def hello_world():
    print("/home")
    return {
        "status": "ok",
        "msg": "At home"
    }


if __name__ == '__main__':

    app.run()
