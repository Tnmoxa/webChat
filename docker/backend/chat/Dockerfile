FROM python:3.11

WORKDIR /Chat

COPY ./chat ./chat

COPY ./.git ./.git

COPY ./pyproject.toml .

COPY ./requirements.txt .

RUN pip install -e .

RUN cd chat/database && DATABASE_URL='chat.sqlite' python3 db_init.py

EXPOSE 8000

CMD ["uvicorn", "chat:app", "--host", "0.0.0.0", "--port", "8000"]
