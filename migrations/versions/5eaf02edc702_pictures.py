"""pictures

Revision ID: 5eaf02edc702
Revises: eeddc2c07a37
Create Date: 2020-11-30 19:18:48.005610

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5eaf02edc702'
down_revision = 'eeddc2c07a37'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('pictures',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('workout_id', sa.Integer(), nullable=False),
    sa.Column('url', sa.String(length=1000), nullable=False),
    sa.ForeignKeyConstraint(['workout_id'], ['workouts.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('pictures')
    # ### end Alembic commands ###