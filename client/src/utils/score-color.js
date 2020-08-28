export const getScoreColor = (score) => {
     let color = VoteColors.EXCELLENT
     if(!score || score === 0) color = VoteColors.UNKNOWN
     else if(score < 5.5) color = VoteColors.BAD
     else if(score < 6.5) color = VoteColors.OK
     else if(score < 7.25) color = VoteColors.GOOD
 
     return color
 }