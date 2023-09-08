
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

> Note: I am using Tailwind CSS CDN instead of configuring Tailwind CLI.

## Core features

 1. Draw lines (small and large strokes), rectangles, circles using mouse.
 2. Erase all drawings on canvas.
 3. Choose any color out of selection of five colors.
 4. Save (hypothetically) and name the current drawing.
 5. Download the drawing. The downloaded file name will reflect the current drawing title or name.
 6. Import existing PNG image file and continue drawing on top of it.

## Future features

 1. Allows dragging and dropping drawings across canvas.
 2. Manual eraser using mouse.
 3. More shapes such as arrow, polygons.
 4. Fill the whole shapes with color.
 5. Develop backend and save the drawing data (metadata and image file) in MySQL database.

## Saving in MySQL database and backend

There are two ways to save the drawing: locally on computer and on the server. I implemented the feature that allow saving the drawing by downloading. In a production-level app, I would implement a full-authentication feature to allow the user sign into their account. Then, the user can save the drawing. By saving, the drawing have the metadata (title, creator) and the drawing image itself. Let's say that we have two tables: User and Drawing.

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

When the user click on 'Save' button, a new entry in Drawing table will be created with its creator id. The user can save the drawing only if they are currently logged in. However, they can download the drawing without logging in.

Regarding the Backend API, we can have a hypothetical Express backend route (https://stemsims.com/api/v1/user/saveDrawing) which uses HTTP POST method. The route receives a payload in a JSON format.
{
	'title': 'Test Drawing',
	createdAt: '2023-09-08 21:30:28',
	fileData: '*************************',
	userID: 22
}

This JSON data will be saved in the MySQL database using a INSERT statement.

### Two methods of saving
User can save the drawing for the first time (Save As) and resave the current drawing (Save).

#### Save As
A new entry will be created in Drawing table using INSERT statement.

### Save
The existing entry will be updated in Drawing table using UPDATE statement. 

This is a very basic overview of how a Backend API would work to save a drawing in the server. 
