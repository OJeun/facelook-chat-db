# Facelook Chat Database


### 🧪 Tech Stack

- **Language:** TypeScript
- **Framework:** Express.js
- **ORM:** Sequelize
- **Database:** MySQL
- **Auth:** JWT + bcrypt
- **Others:** dotenv, CORS


### Entity Relationship Diagram (ERD)
<img width="788" alt="image" src="https://github.com/user-attachments/assets/ef0e6744-e281-400b-b7c3-8650fa3a815f" />

---
## 🧾 Sequelize Models Overview

| Model            | Description                                     |
|------------------|-------------------------------------------------|
| `User`           | User accounts and profile                       |
| `Friend`         | Relationship table for user friendships         |
| `Group`          | Chat groups                                     |
| `UserGroup`      | Join table for many-to-many between users/groups|
| `Chat`           | Chat messages tied to a group                   |
| `Invitation`     | Inviting users to groups                        |
| `FriendRequest`  | Sending/receiving friend requests               |

#### All associations are set up in `db/associations.ts`.
---
## 🧪 Why This Architecture?

### 🔷 Why Sequelize?

This project was built to support a real-time **group chat system**, which includes users, groups, chats, invitations, and friend relationships. Since the system involves multiple interconnected entities, using an Object-Relational Mapping (ORM) tool like **Sequelize** made data modeling and relationship management much easier and more scalable.

We chose Sequelize for the following reasons:

- ✅ **Clear Relationship Management**: Sequelize makes it simple to define complex relationships such as `User ↔ Friend`, `User ↔ Group (via UserGroup)`, and `Group ↔ Chat`.
- ✅ **TypeScript Compatibility**: Each model is defined as a TypeScript class, improving type safety and enabling rich IDE support.
- ✅ **Automatic Table Sync**: Tables can be created and synchronized using `sequelize.sync()` without writing raw SQL.
- ✅ **Migration Support**: With `sequelize-cli`, we can manage schema changes over time with version-controlled migrations.
- ✅ **Flexible Querying**: Sequelize supports both ORM-style queries and raw SQL when more control is needed.

In a chat-based application, it’s essential to work with related data consistently and efficiently. Sequelize provides a clean structure to handle use cases such as:

- Retrieving all friends of a user
- Sending invitations to join groups
- Fetching chat messages in a group
- Linking the last message to a group

These types of operations become easier and more maintainable with Sequelize.

---

🔷 Why Service + Controller Pattern?

To keep the codebase organized, maintainable, and scalable, we followed a **layered architecture** consisting of **Controller → Service → Model**.

Each layer has a specific role:

- **Controller Layer**: Handles HTTP requests/responses, extracts parameters, and returns appropriate status codes.
- **Service Layer**: Contains all the business logic, such as sending a friend request, joining a group, or saving a chat message.
- **Model Layer**: Communicates directly with the database using Sequelize models.

This separation brings several benefits:

- ✅ **Feature Isolation**: Each domain (e.g., user, friend, group, chat) has its own controller and service file, keeping responsibilities clear and modular.
- ✅ **Better Testability**: Services can be unit-tested independently of Express or database code.
- ✅ **Easier Maintenance**: Logic is not spread across routes and controllers, making it easier to debug and refactor.
- ✅ **Future Scalability**: As the app grows, adding features like caching (Redis), real-time messaging (WebSocket), or background jobs becomes much easier when logic is properly separated.
---
## To start mysql locally
brew services start mysql
mysql -u root -p -h localhost -P 3306

## To migrate
 npx sequelize-cli db:migrate
 ### If you want to specify migration file
 npx sequelize-cli migration:generate --name drop-userId-column-from-chat
 ---
## 🌐 Deployment

This backend is currently hosted on **Render**, and was made publicly accessible for testing purposes.

**Base URL**: [https://ios-project.onrender.com](https://ios-project.onrender.com)  
> ⚠️ *Note: The server is currently shut down and may not be available at this time.*

