'use strict';

let currentUser = {};
let comments = [];


fetch('./data.json', {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
    },
})
    .then((response) => response.json())
        .then((data) => {
            currentUser = data.currentUser;
            comments = data.comments;
            renderComments();
            renderReply();
            currentUserBox();
            replyBox();
            deleteModual();
            starRating();
              
    })
     .catch((error) => {
         console.log(error);
     })

    const renderComments = () => {
            comments.forEach(e => {
                    const card = document.getElementById('main');
                       card.innerHTML += `
                            <div class="card">
                              <div class="row d-flex">
                              <div class="col-lg-1 stars">        
                              <img class="stars_plus" src="images/icon-plus.svg" alt="+">
                              <span class="stars_number">${e.score}</span>
                              <img class="stars_minus" src="images/icon-minus.svg" alt="-">
                          </div>
                          <div class="col-lg">
                              <div class="details">
                              <div class="details_upper row d-flex align-items-lg-end align-items-center">
                              <div class="col-lg-1 col-3">
                              <img class="youIcon" src="${e.user.image.png}" alt="icon">
                            </div>

                        <div class="col-lg-3 col">
                          <h1 class="cardNameText">${e.user.username}</h1>

                          </div>
                          <div class="col-lg-3 col"> 
                          <h2 class="cardDate">${e.createdAt}</h2>
                          </div>

                        
                          <div class="col-lg-2 col ms-auto reply">
                        <img class="details_edit_reply" src="images/icon-reply.svg" alt="reply icon">
                        <span class="details_edit_reply_text" id="details_reply_text">Reply</span>
                        </div>
                        </div>
                        </div>


                          <p class="cardComment">${e.content}</p>
                        </div>
                        </div>
                        </div>
                       `;
           });          
}


const renderReply = () => {
        const mainReply = document.getElementById('mainReply');
           mainReply.innerHTML += `
           <div class="card cardReply">
           <div class="row d-flex">
           <div class="col-lg-1 stars">        
           <img class="stars_plus" src="images/icon-plus.svg" alt="+">
           <span class="stars_number">${comments[1].replies[0].score}</span>
           <img class="stars_minus" src="images/icon-minus.svg" alt="-">
         </div>
         <div class="col-lg">
           <div class="details">
           <div class="details_upper row d-flex align-items-lg-end align-items-center">
           <div class="col-lg-1 col-3">
           <img class="youIcon" src="${comments[1].replies[0].user.image.png}" alt="icon">
           </div>

           <div class="col-lg-3 col">
           <h1 class="cardNameText">${comments[1].replies[0].user.username}</h1>

           </div>
           <div class="col-lg-3 col">
           <h2 class="cardDate">${comments[1].replies[0].createdAt}</h2>
           </div>

         
           <div class="col-lg-2 col ms-auto reply">
         <img class="details_edit_reply" src="images/icon-reply.svg" alt="reply icon">
         <span class="details_edit_reply_text" id="details_reply_text">Reply</span>
         </div>
         </div>
         </div>
           
         <p class="cardComment"><span class="commentName">@${comments[1].replies[0].replyingTo}</span> ${comments[1].replies[0].content}</p>
         </div>
         </div>
         </div>
           `;
           replyComment();
}

const currentUserBox = () => {
      const userReply = document.getElementById('currentUser');
         userReply.innerHTML += `
         <div class="card cardReply current_user">
         <div class="row d-flex">
         <div class="col-lg-1 stars">        
         <img class="stars_plus" src="images/icon-plus.svg" alt="+">
         <span class="stars_number">${comments[1].replies[1].score}</span>
         <img class="stars_minus" src="images/icon-minus.svg" alt="-">
       </div>
       <div class="col-lg">
         <div class="details">
         <div class="details_upper row d-flex align-items-lg-end align-items-center">
         <div class="col-lg-1 col-3">
         <img class="youIcon" src="${comments[1].replies[1].user.image.png}" alt="icon">
         </div>

         <div class="col-lg-3 col">
         <h1 class="cardNameText">${comments[1].replies[1].user.username}</h1>
         </div>

         <div class="col-2 col-lg-2 youText">
         <h2 class="you">you</h2>
         </div>

         <div class="col-lg-3 col">
         <h2 class="cardDate">${comments[1].replies[1].createdAt}</h2>
         </div>

       <div class="col-lg-3 col ms-auto reply">
         <img class="details_delete_reply" src="images/icon-delete.svg" alt="delete icon">
         <span class="details_delete_reply_text" id="details_delete_reply_button" data-bs-toggle="modal" data-bs-target="#exampleModal">Delete</span>
         <img class="details_edit_reply" src="images/icon-edit.svg" alt="edit icon">
         <span class="details_edit_reply_text" id="details_delete_reply_edit">Edit</span>
       </div>
       </div>
       </div>
         
       <p class="cardComment"><span class="commentName">@${comments[1].replies[1].replyingTo}</span> ${comments[1].replies[1].content}</p>
       </div>
       </div>
       </div>
         `;
         deleteComment();
         editComment();
}

const replyBox = () => {
    const replyMainBox = document.getElementById('replyBox');
    replyMainBox.innerHTML += `
        <div class="card cardBox">
        <form id="commentRely" action="javascript:void(0);" method="POST" onsubmit="getComment();">
        <div class="row">
        <div class="col-lg-1 col-1">
            <img class="mainIcon" src="${currentUser.image.png}" alt="icon">
       </div>
         <div class="col-lg-9">
            <textarea class="form-control" id="message" type="text" placeholder="Add a comment..." style="height: 10rem;"></textarea>
          </div>
            <div class="col-lg d-flex justify-content-end">
                <input class="btn btn-primary text-uppercase end-0" id="sendBtn" type="submit" value="Send">
            </div>
        </div>
        </form>
    </div>
    `;
}


const starRating = () => {
   const stars_plus = document.querySelectorAll(".stars_plus");
   const stars_minus = document.querySelectorAll(".stars_minus");

    stars_plus.forEach(el => {
        el.addEventListener('click', (e) => {
        e.target.closest('.row').querySelector('.stars_number').innerHTML++;
        });
    });
  
    stars_minus.forEach(el => {
        el.addEventListener('click', (e) => {
        e.target.closest('.row').querySelector('.stars_number').innerHTML--;
        });
    });
}

const getComment = () => {
    document.getElementById('commentRely').addEventListener('submit', (event) => {
      event.preventDefault();
       let commentSend = document.getElementById('message').value;
       const commentAdded = document.getElementById('commentAdded');
       commentAdded.innerHTML += `

       <div class="card cardReply current_user">
       <div class="row d-flex">
       <div class="col-lg-1 stars">        
       <img class="stars_plus" src="images/icon-plus.svg" alt="+">
       <span class="stars_number">${0}</span>
       <img class="stars_minus" src="images/icon-minus.svg" alt="-">
     </div>
     <div class="col-lg">
       <div class="details">
       <div class="details_upper row d-flex align-items-lg-end align-items-center">
       <div class="col-lg-1 col">
       <img class="youIcon" src="${currentUser.image.png}" alt="icon">
       </div>

       <div class="col-lg-2 col">
       <h1 class="cardNameText">${currentUser.username}</h1>
       </div>

       <div class="col-2 col-lg-1 youText">
       <h2 class="you">you</h2>
       </div>

       <div class="col-lg-4 col">
       <h2 class="cardDate">${getCurrentTime(moment().format())}</h2>
       </div>

     <div class="col-lg-3 col ms-auto reply">
       <img class="details_delete_reply" src="images/icon-delete.svg" alt="delete icon">
       <span class="details_delete_reply_text" id="details_delete_reply_button" data-bs-toggle="modal" data-bs-target="#exampleModal">Delete</span>
       <img class="details_edit_reply" src="images/icon-edit.svg" alt="edit icon">
       <span class="details_edit_reply_text" id="details_delete_reply_edit">Edit</span>
     </div>
     </div>
     </div>
       
     <p class="cardComment">${commentSend}</p>
     </div>
     </div>
     </div>
       `;
      
      deleteComment();
      editComment();
    });
}

 const getCurrentTime = (date) => {
    let _date = moment(date);
    let now = moment();
    if (_date.isValid()) {
        let days = now.diff(_date, "days"),
        months = now.diff(_date, "months");
        if (days >= 7 && months == 0) {
            let weeks = now.diff(_date, "weeks"),
            number = weeks > 1 ? 'weeks' : 'week';
            return `${weeks} ${number} ago`;
        }
        return _date.fromNow();
    }
    return date;
 }

const deleteModual = () => {
    const deleteM = document.getElementById('deleteModual');

    deleteM.innerHTML += `
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Delete comment</h5>
        </div>
        <div class="modal-body">
          <p class="modal-text">Are you sure you want to delete this comment? This will remove the comment and can't be undone</p>
              <div class="row g-1">
              <div class="col-6">
              <button type="button" class="btn btn-primary btn-no text-center text-uppercase" data-bs-dismiss="modal" aria-label="Close">No, Cancel</button>
              </div>
              <div class="col-6">
              <button type="button" class="btn btn-primary btn-delete text-center text-uppercase" data-bs-dismiss="modal" aria-label="Close">Yes, Delete</button>
              </div>
              </div>
            
          </div>
            </div>
          </div>

    `;
}


const deleteComment = () => {
  const deleteBtn = document.querySelectorAll('#details_delete_reply_button');
  
  deleteBtn.forEach(el => {
    el.addEventListener('click', (e) => {
    document.querySelector('.btn-delete').onclick = () => {
    e.target.closest('.current_user').remove();
   }
});
});
}

const editComment = () => {
 const editBtn =  document.querySelectorAll('#details_delete_reply_edit');
 
 editBtn.forEach(el => {
 el.addEventListener('click', (e) => {
    const updText = e.target.closest('.current_user').querySelector('.cardComment');
      const textArea = document.createElement('textarea');
      textArea.id = "updateText";
      textArea.value = updText.textContent.trim();
      updText.textContent = '';
      updText.append(textArea);
      const card = e.target.closest('.current_user');
      const row = e.target.closest('.row');
      card.insertBefore(updText, row);
      const updateBtn = document.createElement('button');
      updateBtn.innerHTML = "Update";
      updateBtn.className = "btn-primary";
      updateBtn.className += " text-uppercase";
      updateBtn.className += "  float-end";
      updateBtn.id = "updateBtn";
      updateBtn.style.alignSelf = "flex-end";
      
      updateBtn.setAttribute("type", "submit");
      card.insertBefore(updateBtn, row);


  updateBtn.onclick = () => {
    const updateText = document.getElementById("updateText");
    document.getElementById('updateText').remove();
    document.getElementById('updateBtn').remove();
    updText.append(updateText.value);

  };
});
});
}


const replyComment = () => {
  const replyBtn =  document.querySelectorAll('#details_reply_text');
  replyBtn.forEach(el => {
    el.addEventListener('click', (e) => {
      const replyText = e.target.closest('.card').querySelector('.cardNameText');
      const repText = e.target.closest('.card');
      const reply = document.createElement("div");

      const replyDiv = `
      <div class="card cardBox" id="replyComments">
      <form id="commentRely" action="javascript:void(0);" method="POST" onsubmit="getComment();">
      <div class="row">
      <div class="col-lg-1 col-1">
          <img class="mainIcon" src="./images/avatars/image-juliusomo.png" alt="icon">
     </div>
       <div class="col-lg-9">
          <textarea class="form-control" id="updateText" type="text" placeholder="Add a comment..." style="height: 10rem;">@${replyText.textContent}</textarea>
        </div>
          <div class="col-lg d-flex justify-content-end">
              <input class="btn btn-primary text-uppercase end-0" id="replyBtn" type="submit" value="Reply">
          </div>
      </div>
      </form>
  </div>
  `;
     repText.insertAdjacentHTML("afterend", replyDiv);
     reply.append(replyDiv);

      if(repText.classList.contains("cardReply")) {
        const cardReplyComment = document.getElementById('replyComments');
        cardReplyComment.className += " cardReply";
      } 

  
      const btnReply = document.getElementById('replyBtn');

      btnReply.onclick = () => {
        const cardComment = document.getElementById('updateText').value;
        document.getElementById('replyComments').remove();

        const username = cardComment.split(' ');
       
        const restString = username.slice(1).join(' ');

        const replyCommentBox = `
        
       <div class="card current_user" id="cardReplyComment">
       <div class="row d-flex">
       <div class="col-lg-1 stars">        
       <img class="stars_plus" src="images/icon-plus.svg" alt="+">
       <span class="stars_number">${0}</span>
       <img class="stars_minus" src="images/icon-minus.svg" alt="-">
     </div>
     <div class="col-lg">
       <div class="details">
       <div class="details_upper row d-flex align-items-lg-end align-items-center">
       <div class="col-lg-1 col">
       <img class="youIcon" src="${currentUser.image.png}" alt="icon">
       </div>

       <div class="col-lg-2 col">
       <h1 class="cardNameText">${currentUser.username}</h1>
       </div>

       <div class="col-2 col-lg-1 youText">
       <h2 class="you">you</h2>
       </div>

       <div class="col-lg-4 col">
       <h2 class="cardDate">${getCurrentTime(moment().format())}</h2>
       </div>

     <div class="col-lg-3 col ms-auto reply">
       <img class="details_delete_reply" src="images/icon-delete.svg" alt="delete icon">
       <span class="details_delete_reply_text" id="details_delete_reply_button" data-bs-toggle="modal" data-bs-target="#exampleModal">Delete</span>
       <img class="details_edit_reply" src="images/icon-edit.svg" alt="edit icon">
       <span class="details_edit_reply_text" id="details_delete_reply_edit">Edit</span>
     </div>
     </div>
     </div>
       
     <p class="cardComment"><span class="commentName">${username[0]} </span>${restString}</p>
     </div>
     </div>
     </div>
        
      `;
    
        repText.insertAdjacentHTML("afterend", replyCommentBox);
       reply.append(replyCommentBox);

      if(repText.classList.contains("cardReply")) {
        const cardReplyBox = document.getElementById('cardReplyComment');
        cardReplyBox.className += " cardReply";
      }

        deleteComment();
        editComment();
      };
    });
  });
 }