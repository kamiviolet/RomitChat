const RTCConnection = new function() {
  this.startTime;
  this.localStream;
  this.local;
  this.remote;

  this.constraints = window.constraints = {
    audio: true,
    video: true
  };
  this.offerOptions = {
    offerToReceiveAudio: 1,
    offerToReceiveVideo: 1
  };


  this.init = async function(e) {
    e.preventDefault();

    const initBtn = document.querySelector('#init_vid_btn');
    const callBtn = document.querySelector('#call_btn');   

    initBtn.disabled = true;
    callBtn.disabled = false;

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      RTCConnection.handleInitSuccess(stream);

    } catch (e) {
      handleError(e);
    }
  }


  this.handleInitSuccess = function(stream) {
    const localCam = document.querySelector('#local_cam');
    localCam.srcObject = stream;

    RTCConnection.localStream = stream;
  }


  this.call = async function() {
    const callBtn = document.querySelector('#call_btn');    
    const hangupBtn = document.querySelector('#hangup_btn');

    callBtn.disabled = true;
    hangupBtn.disabled = false;

    RTCConnection.startTime = window.performance.now();

    const configuration = {};

    console.log('RTCPeerConnection configuration:', configuration);

    RTCConnection.local = new RTCPeerConnection(configuration);
    
    console.log('Created local peer connection object local');

    RTCConnection.local.addEventListener('icecandidate', e => {
      console.log("onIceCandidate", e);
      onIceCandidate(local, e);
    });

    try {
      console.log('Local createOffer start');
      const offer = await local.createOffer(offerOptions);
      await RTCConnection.onCreateOfferSuccess(offer, local);
    } catch (e) {
      RTCConnection.onCreateSessionDescriptionError(e);
    }
  }


  this.onIceCandidate = async function(pc, event) {
    try {
      await (getOtherPc(pc).addIceCandidate(event.candidate));
      RTCConnection.onAddIceCandidateSuccessOrErr(pc);//onAddIceCandidateSuccess(pc);
    } catch (e) {
      //onAddIceCandidateError(pc, e);
      RTCConnection.onAddIceCandidateSuccessOrErr(pc, e);
    }
    console.log(`${getName(pc)} ICE candidate:\n${event.candidate ? event.candidate.candidate : '(null)'}`);
  }


  this.onCreateOfferSuccess = async function(desc, somepeercon) { 
    somepeercon.setLocalDescription(desc); 
  }


  this.onAddIceCandidateSuccessOrErr = function(somepeer, possibleErr) {
    if (!possibleErr) {
      console.log("onAddIceCandidateSuccessOrErr OK > ", somepeer);
    } else {
      console.log("onAddIceCandidateSuccessOrErr ERR >", somepeer, possibleErr);
    }
  }


  this.hangTheFuckingFooneEndCaal = function(e)
  {
      e.preventDefault();
  }


  // Error handling
  this.handleError = function(error) {
    if (error.name === 'OverconstrainedError') {
      errorMsg(`OverconstrainedError: The constraints could not be satisfied by the available devices. Constraints: ${JSON.stringify(constraints)}`);
    } else if (error.name === 'NotAllowedError') {
      errorMsg('NotAllowedError: Permissions have not been granted to use your camera and ' +
        'microphone, you need to allow the page access to your devices in ' +
        'order for the demo to work.');
    }
    errorMsg(`getUserMedia error: ${error.name}`, error);
  }

  this.errorMsg = function(msg, error) {
    const errorElement = document.querySelector('#errorMsg');
    errorElement.innerHTML += `<p>${msg}</p>`;

    if (typeof error !== 'undefined') {
      console.error(error);
    }
  }

  this.onCreateSessionDescriptionError = function (error) {
    console.log(`Failed to create session description: ${error.toString()}`);
  }

  this.onSetSessionDescriptionError = function(error) {
    console.log(`Failed to set session description: ${error.toString()}`);
  }
}