FROM node:12 AS build-stage

WORKDIR /react-app
COPY react-app/. .

# You have to set this because it should be set during build time. s/b heroku url not postgres
# needs to be there at the time npm build runs
# the REACT_APP_GOOGLE_KEY can be found in the browser so may be unavoidable
#
# marys heroku account
# ENV REACT_APP_BASE_URL=https://cadence-appacademy-group-proj.herokuapp.com


# Build our React App
RUN npm install
RUN npm run build

FROM python:3.8

# Setup Flask environment
ENV FLASK_APP=app
ENV FLASK_ENV=production
ENV SQLALCHEMY_ECHO=True

EXPOSE 8000

WORKDIR /var/www
COPY . .
COPY --from=build-stage /react-app/build/* app/static/

# Install Python Dependencies
RUN pip install -r requirements.txt
RUN pip install psycopg2

# Run flask environment
CMD gunicorn app:app
