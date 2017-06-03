﻿angular.module('football.controllers')

    .factory('BookingStore', function () {
        var Temp = [];

        return {
            GetMyUpcomingBookings: function (callback) {

                try {

                    
                    var user = firebase.auth().currentUser;
                    var id = user.uid;

                    
                     if(id !== null || id == '' || id === undefined)
                     {
                         
                         Temp = [];
                    firebase.database().ref('/players/' + id + '/upcomingmatches').once('value', function (snapshot) {

                        snapshot.forEach(function (childSnapshot) {

                           var gameedate = new Date();

                            gameedate.setMinutes(childSnapshot.child("minute").val());
                            gameedate.setFullYear(childSnapshot.child("year").val());
                            gameedate.setMonth(childSnapshot.child("month").val());
                            gameedate.setHours(childSnapshot.child("hour").val());
                            gameedate.setDate(childSnapshot.child("day").val());

                            var mybookings = {
                                "key": childSnapshot.val(),
                                "stadiumkey": childSnapshot.child("stadiumkey").val(),
                                "ministadiumkey": childSnapshot.child("ministadiumkey").val(),
                                "day": childSnapshot.child("day").val(),
                                "month": childSnapshot.child("month").val(),
                                "year": childSnapshot.child("year").val(),
                                "minute": childSnapshot.child("minute").val(),
                                "hour": childSnapshot.child("hour").val(),
                                "price": childSnapshot.child("price").val(),
                                "photo": childSnapshot.child("photo").val(),
                                "stadiumdescription": childSnapshot.child("stadiumdescription").val(),
                                "date":gameedate,
                                "duration":childSnapshot.child("stadiumdescription").val(),
                                "phone":childSnapshot.child("duration").val(),

                            };

                            Temp.push(mybookings)
                        });
                        callback(Temp);
                    });
                 }
                 else
                 {
                     callback(Temp);
                 }

                }
                catch (error) {
                    alert(error.message);
                }
            },

            GetMyPastBookins: function (user) {
                Temp = [];
                firebase.database().ref('/players/' + user.usercode + '/upcomingmatches').on('value', function (snapshot) {
                    var currentdate = new Date();

                    snapshot.forEach(function (childSnapshot) {
                        var mybookings = {
                            "key": childSnapshot.val(),
                            "stadiumkey": childSnapshot.child("stadium").val(),
                            "ministadiumkey": childSnapshot.child("ministadium").val(),
                            "teamname": childSnapshot.child("teamname").val(),
                            "day": childSnapshot.child("day"),
                            "month": childSnapshot.child("month"),
                            "year": childSnapshot.child("year"),
                            "hour": childSnapshot.child("hour"),
                            "minute": childSnapshot.child("minute"),
                            "time": childSnapshot.child("starthour"),
                            "price": childSnapshot.child("price")
                        };
                        var bookingdate = new Date(mybookings.year, mybookings.month, mybookings.day, mybookings.hour, mybookings.minute)

                        if (bookingdate < currentdate) {
                            Temp.push()
                        }

                    });
                });

                return Temp;
            },

            GetMyAllBookings: function (key) {
                Temp = [];
                firebase.database().ref('/players/' + user.usercode + '/upcomingmatches').on('value', function (snapshot) {

                    snapshot.forEach(function (childSnapshot) {
                        var mybookings = {
                            "key": childSnapshot.val(),
                            "stadiumkey": childSnapshot.child("stadium").val(),
                            "ministadiumkey": childSnapshot.child("ministadium").val(),
                            "teamname": childSnapshot.child("teamname").val(),
                            "day": childSnapshot.child("day"),
                            "month": childSnapshot.child("month"),
                            "year": childSnapshot.child("year"),
                            "time": childSnapshot.child("starthour"),
                            "price": childSnapshot.child("price")
                        };

                        Temp.push(mybookings)
                    });
                });

                return Temp;
            },

            DeleteMyBookings: function (user, keys) {
                firebase.database().ref('/teams').once('value').then(function (snapshot) {
                    var firstName = snapshot.child("barca/teamphoto").val(); // "Ada"
                    //alert(firstName);


                    snapshot.forEach(function (childSnapshot) {
                        var Items = {
                            "key": childSnapshot.val(),
                            "teamname": childSnapshot.child("teamname").val(),
                            'teamphoto': childSnapshot.child("teamphoto").val(),
                            'datecreated': childSnapshot.child("datecreated").val()

                        };

                        TempItems.push(Items)
                    });
                });

                return TempItems;
            }


        }

    })

