
#1. Ubuntu 18.04 download
#FROM        ubuntu:18.04
FROM        mongo:latest
MAINTAINER  sungbin.na@lge.com

#2. pacage update
RUN apt-get update

#3. toolchain, tools install
RUN apt-get install -y build-essential
RUN apt-get install -y apt-utils
RUN apt-get install -y curl
RUN apt-get install -y wget

#4. nodejs install
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs
RUN node -v && \ 
    npm -v

#5. git install
RUN apt-get install -y git

#6. mongo DB install
#RUN wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | apt-key add -
#RUN echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.2.list
#RUN apt-get update
#RUN apt-get install -y mongodb-org

RUN mkdir -p /data/db 

#7. App download
RUN mkdir -p /workspace/InitiativeManager
RUN git clone https://github.com/nado6miri/InitiativeManager.git /workspace/InitiativeManager
WORKDIR /workspace/InitiativeManager
RUN mkdir -p /workspace/InitiativeManager/public/json
RUN mkdir -p /media/sdet/3dd31023-a774-4f18-a813-0789b15061db
RUN npm install
#EXPOSE 4000
COPY ./javascripts/configuration.js /workspace/InitiativeManager/javascripts/

CMD cd /workspace/InitiativeManager
CMD git pull
#CMD npm start


#[Docker image Build]
#sudo docker build -t initiativemgr:latest ./

#[registry deamon실행]
#sudo docker run --name registry -v ~/dockerimages:/var/lib/registry -dit -p 5000:5000 registry

#[Docker Image tagging]
#sudo docker tag initiativemgr:latest localhost:5000/initiativemgr:latest (docker hub 사용시 localhost/ 대신 계정 id를 적는다.)
#sudo docker push localhost/initiativemgr:latest
#저장된 image확인 : Curl -X GET http://localhost:5000/v2/_catalog
#Tag정보 확인 :curl -X GET http://localhost:5000/v2/initiativemgr/tags/list

#[Image 다운받기]
#sudo docker pull localhost:5000/initiativemgr:latest

#[web Service Run]
#sudo docker run -it --name initmgr -p 4000:4000 -w /workspace/InitiativeManager -v /media/sdet/3dd31023-a774-4f18-a813-0789b15061db/latest_json:/workspace/InitiativeManager/public/json -v /media/sdet/3dd31023-a774-4f18-a813-0789b15061db:/media/sdet/3dd31023-a774-4f18-a813-0789b15061db initiativemgr:latest bash -c "npm start"

#[Execute Update job]
#1. sudo docker run -it --name initmgr -w /workspace/InitiativeManager -v /media/sdet/3dd31023-a774-4f18-a813-0789b15061db/latest_json:/workspace/InitiativeManager/public/json -v /media/sdet/3dd31023-a774-4f18-a813-0789b15061db:/media/sdet/3dd31023-a774-4f18-a813-0789b15061db initiativemgr:latest bash -c "/workspace/InitiativeManager/node update.js params"
#2. use jenkins pipeline 


#pipeline {
#    environment {
#        SERVICE_NAME = 'Initiative Manager V3.00'
#    }
#    
#    agent {
#        docker {
#            image 'initiativemgr:latest'
#            args  '-w /workspace/InitiativeManager -v /media/sdet/3dd31023-a774-4f18-a813-0789b15061db/latest_json:/workspace/InitiativeManager/public/json -v /media/sdet/3dd31023-a774-4f18-a813-0789b15061db:/media/sdet/3dd31023-a774-4f18-a813-0789b15061db'
#        }
#    }
#    
#    options {
#        timeout(time: 2, unit: 'HOURS') 
#    } 
#    
#    stages {
#        stage('Update_Initiative_webOS5.0_Initial') {
#            environment {
#                STAGE_ENV_VARS = 'STAGE_ENV_VARS'
#            }
#            steps {
#                echo "Update_Initiative_webOS5.0_Initial"
#                sh 'cd /workspace/InitiativeManager && node update.js webOS5.0_Initial'
#            }
#        }
#    }
#}



#[jenkins]
#pipeline {
#    environment {
#        SERVICE_NAME = 'Initiative Manager V3.00'
#    }
#    
#    agent {
#        docker {
#            image 'initiativemgr:latest'
#            args  '-w /workspace/InitiativeManager -v /media/sdet/3dd31023-a774-4f18-a813-0789b15061db/latest_json:/workspace/InitiativeManager/public/json -v /media/sdet/3dd31023-a774-4f18-a813-0789b15061db:/media/sdet/3dd31023-a774-4f18-a813-0789b15061db'
#        }
#    }
#    
#   options {
#       timeout(time: 2, unit: 'HOURS') 
#   } 
#    
#   stages {
#       stage('Update_Initiative_webOS5.0_Initial') {
#           environment {
#               STAGE_ENV_VARS = 'STAGE_ENV_VARS'
#           }
#           steps {
#               echo "Update_Initiative_webOS5.0_Initial"
#               sh 'cd /workspace/InitiativeManager && node update.js webOS5.0_Initial'
#           }
#       }
#   }
#}