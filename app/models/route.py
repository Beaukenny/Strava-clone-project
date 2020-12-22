from .db import db
from sqlalchemy import DateTime, func
import json


class Route(db.Model):
    __tablename__ = 'routes'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(1000))
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    staticImageURL = db.Column(db.String(2000), nullable=False)
    requestData = db.Column(db.String(2000), nullable=False)
    starting_point = db.Column(db.String(200), nullable=False)
    streetBike = db.Column(db.Boolean, default=False)
    routeVisibility = db.Column(db.Boolean)
    totalDistance = db.Column(db.String(50), nullable=False)
    totalElevation = db.Column(db.String(50), nullable=False)
    totalDuration = db.Column(db.String(50), nullable=False)
    travelingMode = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(db.DateTime, default=db.func.now())

    user = db.relationship("User", back_populates="route")
    workout = db.relationship("Workout", back_populates="route")

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "name": self.name,
            # "host_id": self.host_id,
            "host": {
                "id": self.user.id,
                "username": self.user.username,
                "email": self.user.email,
                "avatar_url": self.user.avatar_url,
                "biography": self.user.biography,
            },
            "description": self.description,
            # "host_id": self.host_id,
            "staticImageURL": self.staticImageURL,
            "requestData": self.requestData,
            "starting_point": self.starting_point,
            "streetBike": self.streetBike,
            "routeVisibility": self.routeVisibility,
            "totalDistance": self.totalDistance,
            "totalElevation": self.totalElevation,
            "totalDuration": self.totalDuration,
            "travelingMode": self.travelingMode,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
