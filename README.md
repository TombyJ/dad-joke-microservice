Julian Tomas
23.10.2024


Architecture Overview:

The architecture of the Dad Joke Mood Predictor microservice is a simple cloud-native setup that leverages Google Cloud's fully managed services to ensure ease of deployment, scalability, and security.

    Microservice:
        The microservice is built using Node.js and deployed on Google Cloud Run, a fully managed compute platform that automatically scales based on incoming traffic.
        It has two main endpoints:
            /status: Returns the health status of the service.
            /predict-mood: Fetches a random dad joke from an external API (the Official Joke API) and predicts the user's mood based on the length of the joke.
        External API (Dad Joke API):
            The Official Joke API (https://official-joke-api.appspot.com/random_joke) is used to fetch a random dad joke. The microservice makes an HTTP request to this API whenever the /predict-mood endpoint is called.
            Once the joke is retrieved, the microservice calculates the length of the joke (character count) and uses the following rules to predict the mood:
                Short Joke (<80 characters): Likely to cause a groan.
                Medium Joke (80-150 characters): Likely to cause a chuckle.
                Long Joke (>150 characters): Likely to cause laughter.
            This information is then returned as a JSON response, including the joke, character count, and the predicted mood.


Google Cloud Infrastructure Setup:

    Google Cloud Run:
        The microservice is containerized using Docker and deployed to Google Cloud Run. This service provides a serverless environment where the microservice can scale automatically based on incoming requests.
        Cloud Run abstracts infrastructure management, allowing focus on the service logic without worrying about server provisioning, scaling, or maintenance.

    Google Cloud Load Balancer:
        A Google Cloud HTTP(S) Load Balancer is configured to distribute incoming traffic across multiple instances of the microservice if necessary. This ensures high availability and improves performance by routing traffic to the healthiest instances of the service.
        The load balancer also acts as an entry point for all external requests, ensuring that the microservice is capable of handling high traffic efficiently.

    Web Application Firewall (WAF):
        A Google Cloud Armor policy is set up to act as the Web Application Firewall (WAF) for the service. The WAF helps protect the microservice from common web vulnerabilities such as:
            Cross-Site Scripting (XSS)
            SQL Injection
            Distributed Denial of Service (DDoS) attacks
        The WAF policy is configured to filter incoming traffic based on pre-set rules, ensuring that only legitimate requests reach the microservice. This adds a layer of security, preventing malicious traffic from affecting the service.
        HTTPS is enforced through the WAF, ensuring that all communication between users and the microservice is encrypted and secure.


Setup:

## Running Locally
Install dependencies: `npm install`
Start the server: `node run start`

## Docker
Build the Docker image: `docker build -t dad-joke-microservice .`
Run the container: `docker run -p 3000:3000 dad-joke-microservice`

## Define environment variables
Create a file called .env in the working directory with the following variables:
    NODE_ENV="development"
    PORT=3000

=> Access via: localhost:3000