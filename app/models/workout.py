from .db import db
from sqlalchemy import DateTime, func


class Workout(db.Model):
    __tablename__ = 'workouts'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    description = db.Column(db.String(1000), nullable=True)
    workout_photos = db.Column(db.String(2000), nullable=True)
    time = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"),
                        nullable=False)
    route_id = db.Column(db.Integer, db.ForeignKey("routes.id"),
                         nullable=False)
    created_at = db.Column(DateTime, default=func.now())
    updated_at = db.Column(DateTime, default=func.now())
    # date = db.Column(db.String, nullable=True)

    user = db.relationship("User", back_populates="workout")
    route = db.relationship("Route", back_populates="workout")
    # @property
    # def route_preview(self):
    #     return self.route_preview

    # @route_preview.setter
    # def route_preview(self, imgURL):
    #     self.route_preview = imgURL

    # def getRandomCoords():
    #     pass

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "host": {
                "id": self.user.id,
                "username": self.user.username,
                "email": self.user.email,
                "avatar_url": self.user.avatar_url,
                "biography": self.user.biography,
            },
            # "host_id": self.host_id,
            "workout_photos": self.workout_photos,
            "time": self.time,
            "user_id": self.user_id,
            "route_id": self.route_id,
            "route": {
                "id": self.route.id,
                "name": self.route.name,
                "host_id": self.route.host_id,
                "route_preview": self.route.route_preview,
                "route_data": self.route.route_data,
                "starting_point": self.route.starting_point,
                "offroad": self.route.offroad
            },
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
