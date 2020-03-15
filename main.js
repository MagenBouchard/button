$(document).ready(function () {

    let thePuppy = ["Cute", "Happy", "Funny", "Fast"]


    for (let i = 0; i < thePuppy.length; i++) {

        $("<button> <br>").attr("class", "gif-button")
            .attr("data", thePuppy[i])
            .text(thePuppy[i])
            .appendTo("#puppy-buttons")
        // console.log(thePuppy);



    };
    //put empty back 


    let userInput = $("#user-search").val().trim();

    function AddAbutton() {

        let userInput = $("#user-search").val().trim();

        if (userInput === "") {
            return false;
        }


        $("<button> <br>").attr("class", "gif-button")
            .attr("data", userInput)
            .text(userInput)
            .appendTo("#puppy-buttons");
    };




    $("#submit-button").on("click", function (event) {
        event.preventDefault();
        console.log("click");
        AddAbutton(userInput);

    });


});



// note to self! working fine magen do not touch the above!!!! 10/22





$(document).on("click", ".gif-button", function () {

    $("#gifs").empty();
    let gif = $(this).attr("data");

    const queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "dog&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10"

    $.ajax({
        url: queryURL,
        method: "GET"
    })

        .then(function (response) {
            console.log(response.data);

            for (let i = 0; i < response.data.length; i++) {

                let animate = response.data[i].images.downsized.url
                let still = response.data[i].images.downsized_still.url
                let BITurl = response.data[i].bitly_url
                console.log(BITurl)




                let searchTheGif = $("<img>")
                    .addClass("pup-gif")
                    .attr("src", still)
                    .attr("data-state", "still")
                    .attr("data-animate", animate)
                    .attr("data-still", still)

                searchTheGif.appendTo("#gifs")

                $("<div>").html("BITLY URL: " + BITurl + "<br> <hr> <br>").appendTo("#gifs")

            }
        });
});



/// animates or not the GIFS
$(document).on("click", ".pup-gif", function () {
    let state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});









