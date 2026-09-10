# startup

Divergent Threads is an interactive but simple visual novel where users can create their own characters and experience stories based on their choices and character statistics. Users can customise their character, play through different scenarios and reach alternate endings, save their progress, and eventually join friends in shared story experiences.

### Elevator Pitch

Imagine being able to create your own protagonist and experience life as the main character. Divergent Threads is an interactive storytelling application where users create customisable characters and play through scenarios where their choices, morals, and stats alter the story. Players will be able to explore different outcomes, save their progress, and invite friends into shared games where everyone's decisions influence the same story. Instead of just sitting back watching a show, this game lets you become part of the story.

### Design
![Design](IMG_8645.jpg)

Here is a sequence diagram that shows how people would interact with the backend to make shared story choices.

```mermaid
sequenceDiagram
    actor user
    actor friend
    user->>Server: create account
    Server -->>user: account created
    user ->>Server: create character
    Server -->>user: character saved
    user ->>Server: start story
    Server -->>user: story + character data
    user ->>Server: make choice
    Server -->>user: next scenario
    user ->> Server: save progress
    Server -->>user: progress saved
    friend ->>Server: join user's game
    Server -->>friend: game data
    user ->>Server: make choice
    Server -->>friend: user's choice
    friend ->>Server: make choice
    Server -->>user: friend's choice
```

### Key features
- secure login over HTTPS
- simple character customisation
- display of story choices
- ability to select choice
- users can save their progress
- users can choose which story chapters to play (progress is saved)

### Technologies
I will use the required technologies as follows:
- **HTML** : use HTML structure for login page, character creation, story pages, and game interface
- **CSS** : for styling the application, making sure it looks consistent for different screen sizes, uses appropriate amount of whitespace, and colour choice/contrast.
- **React** : used for login, character creation choices
- **Service** : provide backend service with endpoints for:
    - registering and logging in users
    - creating and retrieving characters
    - retrieving stories and chapters
    - submitting story choices
    - saving and retrieving game progress
    - creating and joining multiplayer games
- **DB/Login** : store user data and choices in database (character stats, login details, story choices)
- **WebSocket** : allow players in same game to receive real-time updates when another player makes a choice or when the shared story changes

## Specification Deliverable
For this deliverable I did the following.
- [x] I completed the prerequisites for this deliverable (Git commit requirement)
- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.