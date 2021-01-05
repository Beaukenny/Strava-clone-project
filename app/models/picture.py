from .db import db
from sqlalchemy import DateTime, func


class Picture(db.Model):
    __tablename__ = 'pictures'

    id = db.Column(db.Integer, primary_key=True)
    workout_id = db.Column(db.Integer, db.ForeignKey("workouts.id"),
                           nullable=False)
    url = db.Column(db.String(1000), nullable=False)

    # workout = db.relationship("Workout", back_populates="picture")

    def to_dict(self):
        return {
            "id": self.id,
            "workout_id": self.workout_id,
            "url": self.url,
            # "workouts": {
            #     "id": self.workout.id,
            #     "name": self.workout.name
            # }
        }
