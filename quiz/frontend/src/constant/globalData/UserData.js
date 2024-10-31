import {PATH} from "../../util/index"

export const ADMIN_DASHBOARD = ['Create Queston Set','Add New Question','User Information'  ];

export const ADMIN_IMAGE =[PATH.IMAGE.QUESTIONSET,PATH.IMAGE.QUESTION,PATH.IMAGE.USER];

export const USER_DASHBOARD=['Test Completed','Practice Test','Asignment Pending','Avg Assignment Mark'];

export const USER_DASHBOARD_IMAGE_DATA=[PATH.IMAGE.TESTCOMPLETED,PATH.IMAGE.PRACTICETEST,PATH.IMAGE.TEST,PATH.IMAGE.AVGMARK];

export const DASHBOARD_COLOR=['primary','success','danger','primary'];

export const QUESTION = {
    subject: ['Subject Name', 'text'],
    image: ['Image', 'file'],
    choise: ['Set Choice', 'radio'] 
};

export const NAVBAR_ADMIN_DATA=['DashBoard','Question Set','Add Question','User Info'];

export const NAVBAR_ADMIN_LINK=['/dashboard','/question-set','/question-set-page','/user'];

export const NAVBAR_USER_DATA=['DashBoard','Practice','Assignment'];

export const NAVBAR_USER_LINK=['/dashboard','/practice','/assignment'];