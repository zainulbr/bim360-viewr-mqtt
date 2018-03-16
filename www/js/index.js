/*

The MIT License (MIT)

Copyright (c) Thu Aug 18 2016 Zhong Wu zhong.wu@autodesk.com

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORTOR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

$(document).ready(function () {
  var getToken = () => {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", '/api/token', false);
    xhr.send(null);
    var response = JSON.parse(xhr.responseText);
    return "eyJhbGciOiJIUzI1NiIsImtpZCI6Imp3dF9zeW1tZXRyaWNfa2V5In0.eyJjbGllbnRfaWQiOiJxVHNNa1FPZ3hkV09wMVlMVnBWdmhkbW9YUHFBSzhMQyIsImV4cCI6MTUyMTIwMDQwMCwic2NvcGUiOlsiZGF0YTpyZWFkIl0sImF1ZCI6Imh0dHBzOi8vYXV0b2Rlc2suY29tL2F1ZC9qd3RleHA2MCIsImp0aSI6IkRydFpFb2dGZEtyc1lMNGV6bTZSYzM4Sm5HNlRFOWdvak9hSHNvcnNNY3h1Z0REclVObjZ1WXFvUkp5TEpRSjYifQ.OGdU7D60LR9sQ2z3ONMh8D3fEneOJiyOxLi8TzE4Dss"
  }


  var viewerApp;

  var options = {
    env: 'AutodeskProduction',
    'getAccessToken': getToken,
    'refreshToken': getToken
  };

  var documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bG12ZGJnX3Byb2QvVXJiYW4lMjBIb3VzZSUyMC0lMjBuZXcucnZ0';
  var config3d = {
    extensions: ['MyExtension']
  };


  Autodesk.Viewing.Initializer(options, function onInitialized() {
    viewerApp = new Autodesk.Viewing.ViewingApplication('viewerDiv');
    viewerApp.registerViewer(viewerApp.k3D, Autodesk.Viewing.Private.GuiViewer3D, config3d);
    viewerApp.loadDocument(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
  });
  function onDocumentLoadSuccess(doc) {
    var viewables = viewerApp.bubble.search({
      'type': 'geometry'
    });
    if (viewables.length === 0) {
      console.error('Document contains no viewables.');
      return;
    }
    // Choose any of the avialble viewables
    viewerApp.selectItem(viewables[0].data, onItemLoadSuccess, onItemLoadFail);

  }
  function onDocumentLoadFailure(viewerErrorCode) {
    console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
  }
  function onItemLoadSuccess(viewer, item) {
    viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, function () {
      var instanceTree = viewer.model.getData().instanceTree;
      console.log("geometry loaded")
      });

    console.log('onItemLoadSuccess()!');
  }
  function onItemLoadFail(errorCode) {
    console.error('onItemLoadFail() - errorCode:' + errorCode);
  }

});