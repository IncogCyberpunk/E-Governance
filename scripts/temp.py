from diagnosis_generator import generate_diagnosis
from faker import Faker
fake = Faker()

visit_date = fake.date_between(start_date="-10y", end_date="today")
dx = generate_diagnosis(
    age=5,
    sex="M",
    visit_date=visit_date,
    province="Bagmati",
    start_year=2015
)
print(visit_date.year, visit_date.month, visit_date.day)
print(dx)