from flask.cli import AppGroup
from .users import seed_users, undo_users
from .routes import seed_routes, undo_routes
from .workouts import seed_workouts, undo_workouts
from .pictures import seed_pictures, undo_pictures

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_routes()
    seed_workouts()
    seed_pictures()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_routes()
    undo_workouts()
    undo_pictures()
    # Add other undo functions here
