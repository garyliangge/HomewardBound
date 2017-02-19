# Inspiration
More than 2.7 million pets will be killed over the next year because shelters cannot accommodate them. Many of them are abandoned by owners who are unprepared for the real responsibilities of raising a pet, and the vast majority of them will never find a permanent home. The only sustainable solution to animal homelessness is to maximize adoptions of shelter animals by families who are equipped to care for them, so we created Homeward as a one-stop foster tool to streamline this process.

# What it does
Homeward allows shelters and pet owners to offer animals for adoption online. A simple and intuitive UI allows adopters to describe the pet they want and uses Google Cloud ML's Natural Language API to match their queries with available pets. Our feed offers quick browsing of available animals, multiple ranking options, and notifications of which pets are from shelters and which will be euthanized soon.

# How we built it
We used the Node.js framework with Express for routing and MongoDB as our database. Our front-end was built with custom CSS/Jade mixed with features from several CSS frameworks. Entries in our database were sourced from the RescueGroups API, and salient keywords for query matching were extracted using Google Cloud ML. Our application is hosted using Google App Engine.

# Challenges we ran into
Incorporating Google's Natural Language API was challenging at first and we had to design a responsive front-end that would update the feed as the user updated their query. Some pets' descriptions had extraneous HTML and links that added noise to our extracted tags. We also found it tedious to clean and migrate the data to MongoDB.

# Accomplishments that we're proud of
We successfully leveraged Google Cloud ML to detect salient attributes in users' queries and rank animal in our feed accordingly. We also managed to utilize real animal data from the RescueGroups API. Our front-end also turned out to be cleaner and more user-friendly than we anticipated.

# What we learned
We learned first-hand about the challenges of applying natural language processing to potentially noisy user queries in real life applications. We also learned more about good javascript coding practices and robust back-end communication between our application and our database. But most importantly, we learned about the alarming state of animal homelessness and its origins. 

# What's next for Homeward
We can enhance posted pet management by creating a simple account system for shelters. We would also like to create a scheduling mechanism that lets users "book" animals for fostering, thereby maximizing the probability of adoption. In order to scale Homeward, we need to clean and integrate more shelters' databases and adjust entries to match our schema.