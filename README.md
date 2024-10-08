# Drag n Drop Vue Demo (Swapy)

## The Demo

The Main Demo I currently have produces dice, and allows the user to swap dice spawned into the 'dice pool' into the 'dice row' above. Dice in the 'dice row' are all summed together and a total is displayed at the top of the screen. 

## Uniquely Identifying Swapy Slots in Different Areas/Sections

As far as I can see, Swapy does not currently offer information about the specifics of a drag and drop action when it runs. Only the current state/order of all objects. 

This makes it a little difficult to differentiate between different sections in the UI. There's no built-in way to differentiate a slot in the 'dice pool' from a slot in the 'dice row'.

My solution to this so far is to just create distinct ID syntax for the slots in each area. 

POOL & DICE (aka all swapy items): Currently, the pool slots take randomly generated large numbers. Fine for a demo, but probably could use a more structured system like I've created for the rows in order to truly prevent the possibility of id collisions. 

ROWS: Row ids are determined by a unique letter identifier. I currently use a set with the values in it and iterate over it. Ex: Row 1 = "A", Row 2 = "B". idSet = new Set(["A", "B"])

SLOTS INSIDE A ROW: Slots need to have unique IDs in order to not break, so they can't simply take their row letter. The simple solution is create them out of loop with the desired number and tack their index onto the end. EX: slot "A0", slot "A1", slot "A2", etc... 

PLAYERS: Not implemented. If there multiple 'players' to display onscreen using this system, either more letters would need to be added for row IDs, or a third character with a letter player ID would be added to the system. If it was the former, then we would probably iterate over an ALPHABET string or another set in order to determine who gets what letters assigned to their rows. 

## Todo

-Finish and test DiceSetDemo and the dice set-specific util functions
-Figure out dice visibility checking system (standalone component? slot class? v-show?)
-For DiceRows: Make all but the first empty slot invisible so the rows look less hard-coded? 
-Better safeguarding against colliding Swapy IDs for slots (Dice Pool) and items
-Expand on the dice demo (Delete dice, etc)
-Make a game out of the dice demo? (match number, submit values to a global counter?)
-Figure out why swapy localstorage for component positions is no longer working

## Notes

Drop icon is from freepik

### Swapy 

This is the library I'm working with in order to provide the drag and drop functionality in this project. Still pretty new, as of fall 2024. 

updating to version 0.4.1 (from 0.3.0) has changed behaviour in a weird way. My dynamic swapy pages no longer work the way that they were. It appears that they now require at least one swapy-item exist in the container at mounting or else they break and not work. 

The solution is fairly simple, just add a swapy item and leave it invisible. Not the most elegant thing, but it works. I've rolled back to 0.3.0 because I haven't had the need to use the features that have been added in the past couple of updates. Hopefully this isn't intended behaviour and in future updates it will be corrected. 
