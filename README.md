# Hackathon-Quithn-Frontend
![Quithn Logo](https://github.com/user-attachments/assets/e2fdd293-d55c-4f4a-bc66-e7cedb74722c)


## Project Overview
This is the backend service for the Google Forms Quiz Generator, responsible for processing PDFs using the Gemini API and integrating with the Google Forms API to create quizzes. The backend handles file uploads and manages the transformation of PDF content into quiz questions.

## Features
- **PDF Processing**: Extracts content from uploaded PDFs and generates quiz questions.
- **Gemini API Integration**: Uses the Gemini API to parse PDFs.
- **Google Forms API Integration**: Automatically creates Google Forms quizzes with the parsed questions.
- **REST API**: Provides endpoints for interacting with the frontend and managing the quiz creation flow.
- **No Authentication Required**: This app does not require user sign-up or authentication. IP limiting is implemented to ensure a fair usage

## Tech Stack
- **Node.js & Express**: For backend server and API routing.
- **Gemini API**: Used for extracting content from PDFs.
- **Google Forms API**: For automatically creating quizzes.
