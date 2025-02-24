# How to Use GitHub

## Prerequisites
- Install Git on your computer: https://git-scm.com/downloads
- Create a GitHub account: https://github.com/join

## Steps to Use GitHub

### 1. Create a New Repository
1. Go to https://github.com and log in.
2. Click on the "+" icon in the top right corner and select "New repository".
3. Enter a repository name and description.
4. Choose the visibility (public or private).
5. Click "Create repository".

### 2. Clone the Repository
1. Open a terminal or Git Bash.
2. Navigate to the directory where you want to clone the repository.
3. Run the following command:
    ```
    git clone https://github.com/your-username/your-repository.git
    ```
4. Replace `your-username` and `your-repository` with your GitHub username and repository name.

### 3. Make Changes and Commit
1. Navigate to the cloned repository:
    ```
    cd your-repository
    ```
2. Make changes to your files.
3. Add the changes to the staging area:
    ```
    git add .
    ```
4. Commit the changes:
    ```
    git commit -m "Your commit message"
    ```

### 4. Push Changes to GitHub
1. Push the changes to the remote repository:
    ```
    git push origin main
    ```
2. Replace `main` with the name of your branch if different.

### 5. Create a Pull Request (Optional)
1. Go to your repository on GitHub.
2. Click on the "Pull requests" tab.
3. Click "New pull request".
4. Compare changes and create the pull request.

### 6. Sync Changes from GitHub
1. Pull the latest changes from the remote repository:
    ```
    git pull origin main
    ```
2. Replace `main` with the name of your branch if different.

## Additional Resources
- [GitHub Docs](https://docs.github.com/)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)