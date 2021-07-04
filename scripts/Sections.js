//--------------------------------------------------------------

function troutPadExponentialSection(fund, now){

	var fund = fund;

	var s1Start  = now+0;
	var s1AStart = s1Start+18.6;
	var s2Start  = now+38.2;
	var s2AStart = s2Start+31;
	var s3Start  = s2AStart+30.8;
	var s3AStart = s3Start+18.6;

	// startTime, fund, iArrayBase, iArrayVals, nChords, oArrayVals, pad, fx

	// S1

		troutPadExponential(s1Start+0, fund, 3, [0.5], 1, [8], tPad2, fx2);
		troutPadExponential(s1Start+0, fund, 3, [-0.85], 1, [8], tPad3, fx3);

 		troutPadExponential(s1Start+2.1, fund, 3, [1.25], 1, [8], tPad1, fx1);

		troutPadExponential(s1Start+8.6, fund, 3, [0.5], 1, [8], tPad2, fx2);
		troutPadExponential(s1Start+8.6, fund, 3, [-0.85], 1, [8], tPad3, fx3);

 		troutPadExponential(s1Start+10, fund, 3, [1.25], 1, [8], tPad1, fx1);

 		// S1A
 		troutPadExponential(s1AStart+0, fund, 3, [0.5], 1, [8], tPad2, fx2);
 		troutPadExponential(s1AStart+0, fund, 3, [-0.85], 1, [8], tPad3, fx3);

 		troutPadExponential(s1AStart+2.1, fund, 3, [1.25], 1, [8], tPad1, fx1);

 		troutPadExponential(s1AStart+8.6, fund, 3, [0.5], 1, [8], tPad2, fx2);
 		troutPadExponential(s1AStart+8.6, fund, 3, [-0.85], 1, [8], tPad3, fx3);

 		troutPadExponential(s1AStart+10, fund, 3, [1.25], 1, [8], tPad1, fx1);

 	// S2
 			// bass
 			troutPadExponential(s2Start-2, fund, 3, [0.35], 1, [8], tPad4, fx4);
 			troutPadExponential(s2Start+6, fund, 3, [0.18], 1, [8], tPad4, fx4);
 			troutPadExponential(s2Start-2, fund/2, 3, [0.35], 1, [8], tPad5, fx5);
 			troutPadExponential(s2Start+6, fund/2, 3, [0.18], 1, [8], tPad5, fx5);

 		troutPadExponential(s2Start+0, fund, 3, [0.9], 1, [8], tPad1, fx1);
 		troutPadExponential(s2Start+3, fund, 3, [1.05], 1, [8], tPad2, fx2);
 		troutPadExponential(s2Start+6, fund, 3, [0.75], 1, [8], tPad3, fx3);
 		troutPadExponential(s2Start+8, fund, 3, [0.5], 1, [8], tPad1, fx1);

 		// S2A

 			// bass
 			troutPadExponential(s2Start+14, fund, 3, [0.35], 1, [8], tPad4, fx4);
 			troutPadExponential(s2Start+22, fund, 3, [0.18], 1, [8], tPad4, fx4);
 			troutPadExponential(s2Start+14, fund/2, 3, [0.35], 1, [8], tPad5, fx5);
 			troutPadExponential(s2Start+22, fund/2, 3, [0.18], 1, [8], tPad5, fx5);

 		troutPadExponential(s2Start+11, fund, 3, [1.05], 1, [8], tPad2, fx2);
 		troutPadExponential(s2Start+14, fund, 3, [0.75], 1, [8], tPad3, fx3);
 		troutPadExponential(s2Start+16, fund, 3, [0.35], 1, [8], tPad1, fx1);
 		troutPadExponential(s2Start+19, fund, 3, [0.9], 1, [8], tPad2, fx2);
 		troutPadExponential(s2Start+22, fund, 3, [1.05], 1, [8], tPad3, fx3);
 		troutPadExponential(s2Start+25, fund, 3, [0.19], 1, [8], tPad1, fx1);
 		troutPadExponential(s2Start+28, fund, 3, [0.9], 1, [8], tPad2, fx2);

 		// S2
 			// bass
 			troutPadExponential(s2AStart-2, fund, 3, [0.35], 1, [8], tPad4, fx4);
 			troutPadExponential(s2AStart+6, fund, 3, [0.18], 1, [8], tPad4, fx4);
 			troutPadExponential(s2AStart-2, fund/2, 3, [0.35], 1, [8], tPad5, fx5);
 			troutPadExponential(s2AStart+6, fund/2, 3, [0.18], 1, [8], tPad5, fx5);

 		troutPadExponential(s2AStart+0, fund, 3, [0.9], 1, [8], tPad1, fx1);
 		troutPadExponential(s2AStart+3, fund, 3, [1.05], 1, [8], tPad2, fx2);
 		troutPadExponential(s2AStart+6, fund, 3, [0.75], 1, [8], tPad3, fx3);
 		troutPadExponential(s2AStart+8, fund, 3, [0.5], 1, [8], tPad1, fx1);

 		// // S2A

 			// bass
 			troutPadExponential(s2AStart+14, fund, 3, [0.35], 1, [8], tPad4, fx4);
 			troutPadExponential(s2AStart+14, fund/2, 3, [0.35], 1, [8], tPad5, fx5);

 		troutPadExponential(s2AStart+11, fund, 3, [1.05], 1, [8], tPad2, fx2);
 		troutPadExponential(s2AStart+14, fund, 3, [0.75], 1, [8], tPad3, fx3);
 		troutPadExponential(s2AStart+16, fund, 3, [0.35], 1, [8], tPad1, fx1);
 		troutPadExponential(s2AStart+19, fund, 3, [0.9], 1, [8], tPad2, fx2);
 		troutPadExponential(s2AStart+22, fund, 3, [0.19], 1, [8], tPad1, fx1);

 	// S3

 		troutPadExponential(s3Start+0, fund, 3, [0.5], 1, [8], tPad2, fx2);
 		troutPadExponential(s3Start+0, fund, 3, [-0.85], 1, [8], tPad3, fx3);

 		troutPadExponential(s3Start+2.1, fund, 3, [1.25], 1, [8], tPad1, fx1);

 		troutPadExponential(s3Start+8.6, fund, 3, [0.5], 1, [8], tPad2, fx2);
 		troutPadExponential(s3Start+8.6, fund, 3, [-0.85], 1, [8], tPad3, fx3);

 		troutPadExponential(s3Start+10, fund, 3, [1.25], 1, [8], tPad1, fx1);

 		// S3A
 		troutPadExponential(s3AStart+0, fund, 3, [0.5], 1, [8], tPad2, fx2);
 		troutPadExponential(s3AStart+0, fund, 3, [-0.85], 1, [8], tPad3, fx3);

 		troutPadExponential(s3AStart+2.1, fund, 3, [1.25], 1, [8], tPad1, fx1);

 		troutPadExponential(s3AStart+8.6, fund, 3, [0.5], 1, [8], tPad2, fx2);
 		troutPadExponential(s3AStart+8.6, fund, 3, [-0.85], 1, [8], tPad3, fx3);

 		troutPadExponential(s3AStart+10, fund, 3, [1.25], 1, [8], tPad1, fx1);

}
