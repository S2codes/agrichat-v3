export const API_BASE_URL = "https://odishakrushi.in/agrichatapp/api"


export const getApiUrl = (endpoint) => API_BASE_URL + endpoint


const API_KEY = 'api_key=20882528c754f848c7as0Ss'

export const LOGIN = getApiUrl(`/user/login?${API_KEY}`)
export const SIGNUP = getApiUrl(`/user/signup?${API_KEY}`)
export const GETGROUPS = getApiUrl(`/groups/getGroups?${API_KEY}`)
export const ADDGROUPS = getApiUrl(`/groups/addGroups?${API_KEY}`)
export const JOINEDGROUPS = getApiUrl(`/groups/joinedGroups?${API_KEY}`)
export const FETCHUSERDETAILS = getApiUrl(`/user/userDetails?${API_KEY}`)
export const ADDQUESTION = getApiUrl(`/chat/addQuestion?${API_KEY}`)
export const GETQUESTION = getApiUrl(`/chat/getQuestion?${API_KEY}`)
export const GETQUESTIONBYUSERID = getApiUrl(`/chat/fetchQuestionByUserid?${API_KEY}`)
export const GETQUESTIONBYID = getApiUrl(`/chat/ftechQuestionById?${API_KEY}`)
export const ADDREPLY = getApiUrl(`/chat/addReply?${API_KEY}`)
export const ADDMESSAGE = getApiUrl(`/chat/addMessage?${API_KEY}`)
export const GETMESSAGEBYUSERID = getApiUrl(`/chat/getMessagesByUserid?${API_KEY}`)
export const INBOXMESSAGES = getApiUrl(`/chat/inboxMessages?${API_KEY}`)
export const SAVEDGROUPS = getApiUrl(`/groups/savedGroups?${API_KEY}`)
export const UPDATEGROUPS = getApiUrl(`/groups/updateGroups?${API_KEY}`)
export const DELETEMSG = getApiUrl(`/chat/deleteMessage?${API_KEY}`)
export const DELETEQUESTION = getApiUrl(`/chat/deleteQuestion?${API_KEY}`)
export const FETCHSLIDERIMG = getApiUrl(`/app/slider?${API_KEY}`)
export const FETCHLANGUAGES = getApiUrl(`/translation/languages?${API_KEY}`)
