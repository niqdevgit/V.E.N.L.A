# Hours used

| Sum hours | Hours| What done? | Diary link |
| -------- | -------- | ------- | --------- |
| 1 | 1 | Project initialization | [Link](#30-11-2023) |
| 2 | 1 | skeleton done | [Link](#4-12-2023) |
| 4 | 2 | Added router | [Link](#21-12-2023) |
| 10 | 6 | CI/CD work | [Link](#21-1-2024) |
| 13 | 3 | Container work | [Link](#24-1-2024) |
| 18 | 5 | More container work | [Link](#25-1-2024) |
| 27 | 9 | Progress on multiple fronts | [Link](#29-1-2024) |
| 32 | 5 | User and token handling | [Link](#31-1-2024) |
| 43 | 11 | User remove, themes | [Link](#2-2-2024) |
| 47 | 4 | User edit | [Link](#5-2-2024) |
| 54 | 7 | Error handling and css | [Link](#6-2-2024) |
| 61 | 7 | Theme switching and lint | [Link](#7-2-2024) |
| 70 | 9 | Production and pwa | [Link](#8-2-2024) |
| 77 | 7 | PWA and analytics | [Link](#9-2-2024) |
| | 0 | tbd | |

## 30-11-2023
Made github repo. Wrote down some initial plan in readme.

[Back to top](#Hours-used)

## 4-12-2023
Made frontend and backend skeletons. Also deployed on render

[Back to top](#Hours-used)

## 21-12-2023
Added router and some user handling.

[Back to top](#Hours-used)

## 21-1-2024
Yesterday and mainly today i worked on CI/CD pipeline. This was done for the FullStack course part 11.

[Back to top](#Hours-used)

## 24-1-2024
Did some container work for the Fullstack course part 12. Did not manage to get it to work as intended. Will continue soon.

[Back to top](#Hours-used)

## 25-1-2024
I did more work trying to configure the Docker containers. I am tasked to host my production version on containers. This has turned out to be a major challenge for me. But I managed to do it with a shell script and Apache.

[Back to top](#Hours-used)

## 29-1-2024
I made huge progress today. I discovered a kind of chicken-and-egg dilemma. I have a preference for working on the frontend, but it requires a backend. However, I realized that focusing more on coding and less on worrying will lead me in the right direction.

Additionally, I made a minor change to my project title. Originally, I had the word "naaras" in it. However, my own "naaras" suggested using something softer, like "neito." Therefore, the project is now titled "Valitse elintarvike neidollesi lyhyessä ajassa."

I also identified a need for more planning in my food selection logic. My strategy of doing first and thinking later is proving not to be as effective as I had hoped. I will definitely dedicate some time to improving this aspect soon.

Second also: I found out that my CI/CD pipeline has an issue. The render will take my build files from the latest commit. So, my build step in the pipeline is useless. Well, let's see if I can fix that. Kinda shame to realize I have made such an oversight. But I think this is called something like learning.

[Back to top](#Hours-used)

## 31-1-2024
I made progress on user handling on the backend. I included the authentication tokens as well. I began to work on frontend functionalities. Due to a lack of hours in a day, I will continue my work later.

I had an interesting battle with Vite. The Vite builder made me an index.html file that had some SVG resource by default. I have cleared my project from default stuff, so I got a console error that it is missing. After a long and hard debugging battle, I managed to make the console error disappear. I have no idea how, and will the error return? We will see.

[Back to top](#Hours-used)

## 2-2-2024
Yesterday and mainly today (deja vu?), I worked on user and token stuff. Added theme skeleton. I feel like obsessing over small details is what is keeping me from achieving greatness. I found out that "faking it till making it" only goes so far. I mean that full-stack development is a huge bite to take at once. So using shortcuts and skipping error handling, for example, speeds the process nicely. The shadow side is that now I have a mess of code with a lack of structure and error handling. I think it's fine that I didn't get too stuck on important fundamentals, but on the other hand, it would be nice to work on a project which is more clear.

[Back to top](#Hours-used)

## 5-2-2024
Worked on a PUT request, now I can change users' passwords. Now I have all the "big concepts" working as intended. Now I can start to focus on polishing the features. I also had an interesting call today with my developer friend. I have wondered if I could do the AI implementation, or am I just dreaming. But apparently, it is not that hard or expensive.

[Back to top](#Hours-used)

## 6-2-2024
I added error handling to the backend and appropriate messaging to the frontend. I worked on CSS a lot. I'm not that competent in CSS, but I really enjoy working with it. I managed to create some kind of neo-brutalism style.

[Back to top](#Hours-used)

## 7-2-2024
I had a legendary battle with the theme switcher. I wanted to use real CSS, not some ReactJS trick. That caused me to come up with a solution that must be illegal or at least morally highly doubtful. Nowadays I store my CSS files in the backend, not frontend. Then I fetch them and set them dynamically. Performance suffers a little, but every war takes its casualties.

IDK, this turned into a therapy session, but I need to get something off my chest. I feel like an impostor. I cannot make professional and robust solutions. I feel like all I ever develop are tape and glue solutions that get the job done, but are not the "correct" way to do. I soon start my first official developer job at a real company. Maybe seeing how "the real professionals" do it I get some confidence in me. And also I might learn "the one and only correct way" to do things.

I also tried to deploy the app, no time today to debug it. 🙁

[Back to top](#Hours-used)

## 8-2-2024
This time, dear reader, you get that live tweeting experience. You are welcome:

I got my deployment working; I had an annoying typo there. I noticed that my published production version works great on PC, at least on Firefox. But the mobile experience does not work. I have no idea why. I'm guessing it might be something to do with mobile browsers' local storage? I hope this revelation does not crush my PWA dreams. We will see.

Like I guessed, I found out that Chrome has kind of handy dev tools for mobile. Mobile has issues getting the CSS.

I noticed a big mistake: I had my styles served on localhost. As I opened the production app, it got the styles from localhost. That's why mobile did not work. Next, I noticed that the render hosts the app on localhost:10000 and looks for resources from localhost:3001. Let's fix this.

Full-stack debugging is weird. When you finally solve the issue, you feel like a mastermind who has just escaped the Matrix. On the other hand, a typo in the URL or wrong paths in the production environment make me question if I should switch professions to something more suitable for someone who barely passed the cube object to cube hole test.

I had the privilege to have my mother-in-law candidate visit us at the same time I debugged the production version. I got valuable feedback from her. The "title" on the navbar works as great home button, according to her. There were suggestions on how to make the food picking tree more intuitive and clear for the user.

Finally i tried to implement PWA functionality. I have a PWA obsession; it hurts my heart that they are not more common.

[Back to top](#Hours-used)

## 9-2-2024

Today, I used React Helmet to set the head of my page. This has been on my to-do list for a long time, but I finally implemented it. I also added development paths to my code to make development easier in the future. I really disliked the analytics page, so I made it more user-friendly to use.

[Back to top](#Hours-used)