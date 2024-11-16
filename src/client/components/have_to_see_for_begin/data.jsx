from pymongo import MongoClient
from datetime import datetime
import os

# Connect to MongoDB (secure credentials using environment variables)
client = MongoClient("mongodb+srv://Otwo:1234@se-project.qqqt0.mongodb.net/")

# Create Database
db = client["DatingApp"]

# Create Collections
users_collection = db["Users"]
profiles_collection = db["Profiles"]
matches_collection = db["Matches"]
chats_collection = db["Chats"]
messages_collection = db["Messages"]
restaurants_collection = db["Restaurants"]
chat_notifications_collection = db["Chat_Notifications"]

# Sample Data Insertion with Error Handling

try:
    # 1. Users Collection
    user = {
        "userID": "U001",
        "username": "siratee",
        "name": "Siratee Saiprom",
        "email": "siratee@example.com",
        "password": "1234",
        "address": {"latitude": 13.7563, "longitude": 100.5018},  # Bangkok
        "nationalID": 1234567890123,
        "birthdate": datetime(1995, 1, 1),
        "gender": "male"
    }
    users_collection.insert_one(user)

    # 2. Profiles Collection
    profile = {
        "userID": "U001",
        "photo": ["photo_101.jpg", "photo_102.jpg", "photo_103.jpg"],
        "bio": "A passionate developer who loves traveling and spicy food.",
        "education": "Bachelor's in Computer Science",
        "job": "Software Developer",
        "hobby": "coding, hiking, cooking",
        "tag": ["spicy_food", "vegan", "outdoor_lover"],
        "swipeDailyCount": 5,
        "acceptDailyCount": 2,
        "location": {"latitude": 13.7563, "longitude": 100.5018},
        "isRegistered": True,
        "isHungry": False
    }
    profiles_collection.insert_one(profile)

    # 3. Matches Collection
    match = {
        "matchID": "M001",
        "userID1": "U001",
        "userID2": "U002",
        "isMatch": True,
        "matchTime": datetime.now()
    }
    matches_collection.insert_one(match)

    # 4. Chats Collection
    chat = {
        "chatID": "C001",
        "matchID": "M001",
        "all_messageIDs": ["MSG001", "MSG002"]
    }
    chats_collection.insert_one(chat)

    # 5. Messages Collection
    message = {
        "chatID": "C001",
        "messageID": "MSG001",
        "userID_sender": "U001",
        "text": "Hi, nice to meet you!",
        "time_send": datetime.now(),
        "isRead": False
    }
    messages_collection.insert_one(message)

    # 6. Restaurants Collection
    restaurant = {
        "restaurantID": "R001",
        "name": "Spicy Thai Cuisine",
        "tag": ["spicy", "thai_food", "vegan"],
        "location": {"latitude": 13.7563, "longitude": 100.5018},
        "photo": ["restaurant_201.jpg", "restaurant_202.jpg"],
        "description": "A cozy place offering authentic Thai cuisine with a variety of vegan options."
    }
    restaurants_collection.insert_one(restaurant)

    # 7. Chat_Notifications Collection
    chat_notification = {
        "notificationID": "N001",
        "userID_sender": "U001",
        "text": "You have a new match!"
    }
    chat_notifications_collection.insert_one(chat_notification)

    print("Database and collections created successfully!")

except Exception as e:
    print(f"An error occurred: {e}")

    from pymongo import MongoClient
    from datetime import datetime
    
    # เชื่อมต่อ MongoDB
    client = MongoClient("mongodb+srv://Otwo:1234@se-project.qqqt0.mongodb.net/")
    db = client["DatingApp"]
    users_collection = db["Users"]
    
    # สร้าง Admin User
    admin_user = {
        "userID": "A001",
        "username": "otwo",
        "name": "Admin Siratee",
        "email": "admin@example.com",
        "password": "1234",  # ควรเข้ารหัสผ่าน เช่น bcrypt
        "role": "admin",  # ระบุ Role ว่าเป็น admin
        "permissions": ["manage_users", "manage_profiles", "view_reports", "manage_settings"],  # กำหนดสิทธิ์
        "created_at": datetime.now()
    }
    
    # เพิ่มข้อมูล Admin User ลงใน Collection
    try:
        users_collection.insert_one(admin_user)
        print("Admin created successfully!")
    except Exception as e:
        print(f"Error occurred: {e}")
    