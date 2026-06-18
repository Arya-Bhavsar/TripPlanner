from fastapi import FastAPI

app = FastAPI(title="Trip Planner")

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI!"}