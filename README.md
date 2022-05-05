# COVID-19 Management Application
## INFO6150 Final Project
### Group 6: NBGroup
| Name | NUID | Email |
| ---------- | --------- | ----------------------- |
| Jinnan Shao | 001528750 | shao.jin@northeastern.edu |
| Junyan Ren | 001529948 | ren.ju@northeastern.edu |
| Yaodong Cui | 002191616 | cui.yao@northeastern.edu |
| Licong Lou | 002100980 | lou.li@northeastern.edu |

## Requirements
1. The project should have some form of create, read, update and delete (CRUD) operations.
2. The backend can be implemented using Nodejs/mongo or just use any open APIs.
3. Project git repo should have two directories: one for UI (named web app) and the other for backend (named server).
4. The code should be merged on the master branch before the deadline. If the code is not in master then it won't be graded.
5. You should follow all the guidelines listed on assignments like code documentation, README.md file, .gitignore file, etc.
6. No shopping site.

## Project Description
The general goal of this design is to create a system to statistics on the data of COVID-19 vaccinations and nucleic acid test, provide basic data to hospitals, civilians and governmnts to support their strategy responding to COVID-19.

**Domain Model**<br>
Main Roles: Patient, Hopital(System Admin)<br>
Main Duty of Each Role:<br>
1. Patient<br>
-Sign in and sign up user accounts<br>
-Log out account from database<br>
-Check and update user information<br>
-Schedule vaccine and cancel vaccine appointment<br>
-Check vaccine status and other vaccine information<br>
-Schedule test and cancel test appointment<br>
-Check test status and other test information by QR code<br>
2. Hospital:<br>
-Accepting appointments of nucleic acid test and vaccines for customers<br>
-View and modify customer's health status<br>

**User Stories**<br>
* As a hospital user, I can control the number of appointments based on system data, to avoid the situation that there are not enough vaccines to deal with the patients who make appointments
* As a hospital user, I can rely on the data provided by the system, combined with my actual situation, to report the local epidemic situation to the government and assist in epidemic prevention and control
* As a hospital user, I can manage all users' information in the database
* As a civilian user, I can use the system to make COVID-19 vaccine and test appointments
* As a civilian user, I can check my COVID-19 vaccine and test results by QR code and other appointment information
* As a civilian user, I can sign up my account, and log out it from user database

### Run The Code

Run the following command in your shell:
```sh
git clone https://github.com/neu-mis-info6150-spring-2022/final-project-6150_nbgroup.git
```

