
# React TypeScript STEM Sims Exercise

 This app was created for the STEM Sims Front-end Exercise.

## Run the App

Install dependencies:
```bash

npm  i

```
Run the app:

```bash

npm  start

```
## External Libraries Used

 1. React Konva
 2. Tailwind CSS
 3. Material UI and MUI icons
 4. uuid
 5. TypeScript
 6. React Router

> Note: I am using Tailwind CSS CDN instead of configuring Tailwind CLI.

## Core features

 1. Draw lines (small and large strokes), rectangles, circles using mouse.
 2. Drag and drop drawings (might interfere with drawing).
 2. Erase all drawings on canvas.
 3. Choose any color out of selection of five colors.
 4. Save (hypothetically) and name the current drawing.
 5. Download the drawing. The downloaded file name will reflect the current drawing title or name.
 6. Import existing PNG image file and continue drawing on top of it.
 7. Responsive to various screen sizes (large, medium, mobile).
 8. Choose the size of drawing tool, ranging from (small, medium, large).
 9. Allows dragging and dropping using the Mover drawing tool.
 10. Save the drawings in the global state (App Content Provider) and recreate the existing drawings.

## Future features

 1. Manual eraser using mouse.
 2. More shapes such as arrow, polygons.
 3. Fill the whole shapes with color.
 4. Develop backend and save the drawing data (metadata and image file) in MySQL database.
 5. Unit testing or End-To-End Testing.

## Saving in MySQL database and backend

There are two methods for saving your drawings: locally on your computer and on the server. Currently, I've implemented a feature that enables you to save your drawing by downloading it directly. In a production-ready application, I would further develop this feature by implementing full authentication, allowing users to sign in to their accounts. With this functionality, users can save their drawings, complete with metadata like the title and creator's information.

For database management, we could utilize two tables: 'User' and 'Drawing'.

### User Table

 - id: int (Primary Key)
 - name: varchar
 - DOB: date

### Drawing Table

 - id: int (Primary Key)
 - title: varchar
 - createdAt: datetime
 - fileData: longblob
 - userID: int (Foreign Key)

These two tables represent One-To-Many relationship. The user can have many drawings while each drawing only has one creator. The Drawing table uses Foreign Key (userID) to save its creator. 

When the user click on 'Save As' button, a new entry in Drawing table will be created with its creator id. The user can save the drawing only if they are currently logged in. However, they can download the drawing without logging in.

Regarding the Backend API, we can have a hypothetical Express backend route (https://stemsims.com/api/v1/user/saveDrawing) which uses HTTP POST method. The route receives a payload in a JSON format. ```{ "title": "Test Drawing", "createdAt": '2023-09-08 21:30:28', "fileData": "************"}```

This JSON data will be saved in the MySQL database using a INSERT statement.

### Two methods of saving
User can save the drawing for the first time (Save As) and resave the current drawing (Save).

#### Save As
A new entry will be created in Drawing table using INSERT statement.

### Save
The existing entry will be updated in Drawing table using UPDATE statement. 

This is a very basic overview of how a Backend API would work to save a drawing in the server. 
