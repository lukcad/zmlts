# zmlts project (UI5 + TS)

## overview

This appllication is an implemented version of walkthrought tutorial [Walkthrough Tutorial (TypeScript)](https://sapui5.hana.ondemand.com/#/topic/dad1905a07f849ce9c509721317d38d8) 
Code was created by `VS Code` on `development container` which has all necessary components and extensions to let you go with your own development of this project using `docker` approach.

## how to use

The below steps explain how to create your `development container` and then clone this project and run into development container.

### Steps:

#### 1 step: Open VS Code on system where your docker is installed as a service:

  - If you have installed docker on WSL then you should be connected to your WSL by palette command:

        WSL: Connect to WSL

  - open working folder on server, ususally it is `home/<your user name>`

    <img width="453" alt="image" src="https://github.com/lukcad/zmlts/assets/22641302/4881bd3f-adde-45ee-b150-3632e01d2fdc">

  - open terminal of VS code and check that your docker is accessible

        docker --version

    <img width="161" alt="image" src="https://github.com/lukcad/zmlts/assets/22641302/0c63227d-b47e-4435-a835-cb81b68e88a1">



#### 2 step: create development container into your working folder

  - In terminal of VS code, using your working folder, by clonning process from git you will create development container.
  
    You clone development container from GitHub with your own name.
    For example, if you wish have name of development container as `caplukcadhfdev` then clone command looks like:

        git clone https://github.com/lukcad/caplukcadhf.git caplukcadhfdev
    
    <img width="321" alt="image" src="https://github.com/lukcad/zmlts/assets/22641302/58ba53b7-30ff-4817-b0c0-316d6e36739a">



  - once development container is clone you shoudl open it

    Using File -> Folder -> Open Folder -> /home/lukcad/`your_name_of_development_container`

    <img width="345" alt="image" src="https://github.com/lukcad/zmlts/assets/22641302/ce18cfc1-7382-4fda-b0a9-67359b6b3269">

    Confirm when VS code will propose open your folder as a container:

    <img width="436" alt="image" src="https://github.com/lukcad/zmlts/assets/22641302/051b5f95-da62-4bab-a38c-da7df615a759">

    You should have in expolorer name of your container and in left bottom coner record that it is `Dev Container: SPA CAP - caplukcadhf`
    and if you open terminal you will finde name of your development container there after /workspace/

    <img width="419" alt="image" src="https://github.com/lukcad/zmlts/assets/22641302/fd5016ab-e637-470a-a648-3a1100e88067">

    Now your development container is prepared. You can go to the next step and clone this proejct.

    
#### 3 step: clone zmlts project (UI5 + TS)

- In terminal of your `development container` you shoudl execute this command to clone project for your development with your own name:

        git clone https://github.com/lukcad/zmlts.git zmlui5ts

    <img width="406" alt="image" src="https://github.com/lukcad/zmlts/assets/22641302/ad496597-ccb1-4cab-8c75-b8070fc98ae5">

- You can open in terminal the folder of cloned project, but better it is open as a project in separate View:

    Type in terminal:

        code zmlui5ts

    and in new VS code window will be your project where you can go with all your coding and running.

    <img width="413" alt="image" src="https://github.com/lukcad/zmlts/assets/22641302/65bcd355-bc6a-40f0-bf02-4a6b414598e5">
    
- install all librarioes

  In terminal of project run command:

      npm install

    <img width="409" alt="image" src="https://github.com/lukcad/zmlts/assets/22641302/a2b3de49-e6c8-4c6e-995e-324513515d1d">

- run project in development mode:

  In terminal of project run command:

      npm start

  Notice: first start will create a lot of dependencies and it takes time, you can ignore all error and warnings during start.

  <img width="478" alt="image" src="https://github.com/lukcad/zmlts/assets/22641302/3f7659aa-9674-4a07-8901-57a86aee1dc2">


  If you need build `dist compressed container`and then run it as a server you can do it by commands:

      npm run build

      npm run serve-dist


Happy programming!

Yours sincirely, 

Mikhail.


    



