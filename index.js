class Track {
    constructor(artistName, trackName){
    this.artistName = artistName
    this.trackName = trackName
}
describe(){
    return '${this.trackName} is a track by ${this.artist}.'
}
// creates our track class :D
}

class Playlist{
    constructor(PlaylistName){
        this.PlaylistName = PlaylistName
        this.tracks = []
    }
    addTracks(track){
        if(track instanceof Track){
            this.tracks.push(track)
        } else{
            throw new Error('You can only add an instance of Track.')
        }
    }
    describe(){
        return 'S{this.name} has ${this.tracks.length} tracks.'
    }
    //creates our playlist class! also creates an add track method within the same class. just checks it and pushes it to our tracks array.
    //also will throw us an error message if we try and add a track and its not an instance of the track class.
}

//this is our main menu class. it also stores a playlists array. created switch statements for our menu appearance.
// we also create our needed methods within the switch statement from the top down. 
// and then we added our VISIBLE menu options on the pop up with a prompt keyword and backticks.
class Menu{
    constructor(){
        this.playlists = []
        this.selectedPlaylist = null
    }
    start(){
        let selection = this.showMainMenuOptions()
        while (selection != 0){
            switch (selection){
                case '1':
                    this.createPlaylist()
                    break
                case '2': 
                    this.viewPlaylist()
                    break
                case '3':
                    this.deletePlaylist()
                    break
                case '4':
                    this.displayPlaylists()
                    break
                default:
                    selection = 0
            }
        selection = this.showMainMenuOptions()
        }
        alert('Goodbye!')
    }
    showMainMenuOptions(){
        return prompt(`
        0) back
        1) create new playlist 
        2) view playlist 
        3) delete playlist
        4) display all playlists
        `)
        
    }
    // here is the same thing as the menu options but it is a submenu for once a playlist has been created.
    showPlaylistMenuOptions(playlistInfo){
        return prompt(`
        0) back
        1) create track
        2) delete track
        ${playlistInfo}
        `)
    }
    // this is where we start defining our main menu options so they actually work.
    displayPlaylists(){
        let playlistString = ''
        for (let i = 0; i < this.playlists.length; i++){
            playlistString += i + ') ' + this.playlists[i].PlaylistName + '\n'
        }
        alert(playlistString)
    }
    createPlaylist(){
        let playlistName = prompt('Enter new playlist name:')
        this.playlists.push(new Playlist(playlistName))
    }
    viewPlaylist(){
        let index = prompt('Enter the index of the playlist you want to view:')
        if (index > -1 && index < this.playlists.length){
            this.selectedPlaylist = this.playlists[index]
            let description = 'Playlist Name: ' + this.selectedPlaylist.PlaylistName + '\n'

        for(let i = 0; i < this.selectedPlaylist.tracks.length; i++){
            description += i + ') ' + this.selectedPlaylist.tracks[i].artistName + ' - ' + this.selectedPlaylist.tracks[i].trackName + '\n'
            //i will admit i had an issue with the artistname and trackname coming back as undefined. eventually i realized in line 100 i was just using [i].name and 
            // not [i].artistName and [i].trackName to match my parameters from my Track class.
        }
        let selection = this.showPlaylistMenuOptions(description)
        switch (selection){
            case '1':
                this.createTrack()
                break
            case '2':
                this.deleteTrack()
        }
        }
    }
    deletePlaylist(){
        let index = prompt('Enter the index of the playlist you want to remove:')
        if (index > -1 && index < this.playlists.length){
            this.playlists.splice(index, 1)
        }
    }

    createTrack(){
        let artistName = prompt('Enter artist name:')
        let trackName = prompt('Enter track name:')
        this.selectedPlaylist.tracks.push(new Track(artistName, trackName))
        
    }
    deleteTrack(){
        let index = prompt('Enter the index of the track you want to remove:')
        if (index > -1 && index < this.selectedPlaylist.tracks.length){
            this.selectedPlaylist.tracks.splice(index, 1)
        }
}
}
// this was a lot but super super fun to see the end result of!

let menu = new Menu()
menu.start()

