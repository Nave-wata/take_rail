FROM python:3.9.16-bullseye

WORKDIR /app

COPY requirements.txt .

RUN useradd -m -s /bin/bash python; \
    chown python:python -R /app; \
    python -m pip install --upgrade pip; \
    pip install --no-cache-dir --upgrade -r ./requirements.txt 

USER python