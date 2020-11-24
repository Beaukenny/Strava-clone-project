from .db import db


class Route(db.Model):
    __tablename__ = 'routes'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    host_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    route_preview = db.Column(db.String(1000), nullable=True)
    route_data = db.Column(db.String(2000), nullable=True)
    starting_point = db.Column(db.String(200), nullable=False)
    offroad = db.Column(db.Boolean)

    # user = db.relationship("Route", back_populates="users")

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
            "host_id": self.host_id,
            #     "id": self.User.id,
            #     "username": self.User.username,
            #     "email": self.User.email,
            #     "avatar_url": self.User.avatar_url,
            #     "biography": self.User.biography,
            # },
            # "host_id": self.host_id,
            "route_preview": self.route_preview,
            "route_data": self.route_data,
            "starting_point": self.starting_point,
            "offroad": self.offroad
        }
