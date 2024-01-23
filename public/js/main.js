const deleteText = document.querySelectorAll('.fa-trash');
const thumbText = document.querySelectorAll('.fa-thumbs-up');

Array.from(deleteText).forEach((element) => {
    element.addEventListener('click', deleteAthlete);
});

Array.from(thumbText).forEach((element) => {
    element.addEventListener('click', addLike);
});

async function deleteAthlete() {
    const athleteName = this.parentNode.childNodes[1].innerText;
    const eventName = this.parentNode.childNodes[3].innerText;
    try {
        const response = await fetch('deleteAthlete', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'athleteName': athleteName,
                'eventName': eventName
            })
        });
        const data = await response.json();
        console.log(data);
        location.reload();
    } catch (err) {
        console.log(err);
    }
}

async function addLike() {
    const athleteName = this.parentNode.childNodes[1].innerText;
    const eventName = this.parentNode.childNodes[3].innerText;
    const pb = this.parentNode.childNodes[5].innerText;
    const currentLikes = Number(this.parentNode.childNodes[7].innerText);
    try {
        const response = await fetch('addOneLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'athleteName': athleteName,
                'eventName': eventName,
                'pb':pb,
                'currentLikes': currentLikes
            })
        });
        const data = await response.json();
        console.log(data);
        location.reload();
    } catch (err) {
        console.log(err);
    }
}