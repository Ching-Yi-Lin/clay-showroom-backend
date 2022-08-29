# Contributing

## How to contribute for the first time
1. Clone the app: 
```
git clone https://github.com/Ching-Yi-Lin/clay-showroom-backend.git
```
2. Create a dev branch: 
```
git checkout -b dev
```
"-b" means a new branch

3. Create a feature branch off the dev branch:
```
git checkout -b feat/add-edit-product
```
"feat" means this is a feature, and this feature will let the admins add and edit products

---

## How to contribute to the remote repository (on Github)
1. Swich to your local dev branch
```
git checkout dev
```
2. Merge your feature branch into the dev branch
```
git merge feat/add-edit-product
```
The name of the branch is whatever your feature branch name is

3. Commit and push your code to the remote dev branch:
```
git add -A
git commit -m "Implemented add/edit functionality"
git push origin dev
```
4. Make a pull request.
