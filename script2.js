document.addEventListener('DOMContentLoaded', function() {
    var currentLevel = 1;
    var maxLevel = 5;
    var score = 0;
    
    document.getElementById('startGame').addEventListener('click', startGame);
    document.getElementById('endGame').addEventListener('click', endGame);
    
    function startGame() {
        console.log("Start game function called");
        loadShapesForLevel(currentLevel);
        document.getElementById('startGame').disabled = true;
        document.getElementById('endGame').disabled = false;
    }
    
    function endGame() {
      console.log("Game over. Your Score is " + score);
        if (confirm("Would you like to play again?")) {
            resetGame();
        }
    }
    
    function resetGame() {
        currentLevel = 1;
        score = 0;
        updateGameInfo();
        loadShapesForLevel(currentLevel);
        document.getElementById('startGame').disabled = false;
        document.getElementById('endGame').disabled = true;
    }
    
    function loadShapesForLevel(level) {
        clearGameArea();
    
        var shapes;
        var silhouettes;
    
        switch (level) {
            case 1:
                shapes = ['circle', 'square', 'rectangle'];
                silhouettes = ['circleSilhouette', 'squareSilhouette', 'rectangleSilhouette', ];
                break;
            case 2:
                shapes = ['circle', 'oval', 'diamond', 'square'];
                silhouettes = ['circleSilhouette', 'ovalSilhouette', 'diamondSilhouette', 'squareSilhouette'];
                break;
    
            case 3:
                shapes = ['square', 'rectangle','oval','ellipse'];
                silhouettes = [ 'squareSilhouette', 'rectangleSilhouette','ovalSilhouette','ellipseSilhouette'];
                break;
            case 4:
                shapes = ['circle', 'diamond', 'oval','square','ellipse'];
                silhouettes = ['circleSilhouette', 'diamondSilhouette', 'ovalSilhouette','squareSilhouette','ellipseSilhouette'];
                break;
            case 5:
                shapes = ['rectangle',  'oval','ellipse','diamond','square']
                silhouettes = ['ellipseSilhouette','diamondSilhouette','squareSilhouette','ovalSilhouette', 'rectangleSilhouette'];
                break;
             case 6:
                 gameOver();
                break;
                        
        }
    
        shapes.forEach(shape => addElement(shape, 'shapes', 'shape'));
        silhouettes.forEach(silhouette => addElement(silhouette, 'silhouettes', 'silhouette'));
    
    }
    
    
    
    
    function dragOver(event) {
        event.preventDefault();
    }
    
    function updateGameInfo() {
        document.getElementById('scoreDisplay').textContent = score;
        document.getElementById('levelDisplay').textContent = currentLevel;
    }
    
    
    document.getElementById('startGame').addEventListener('click', startGame);
    document.getElementById('endGame').addEventListener('click', endGame);
    
    
    
    function gameOver() {
        alert("Game over. Your Score is " + score);
        if (confirm("Would you like to play again?")) {
            resetGame();
        }
    }
    
    function resetGame() {
        currentLevel = 1;
       if (confirm("Would you like to reset your score?")) 
        score =0;
        updateGameInfo();
        loadShapesForLevel(currentLevel);
        document.getElementById('startGame').disabled = false;
        document.getElementById('endGame').disabled = true;
    }
    
    
    function clearGameArea() {
        document.getElementById('shapes').innerHTML = '';
        document.getElementById('silhouettes').innerHTML = '';
    }
    
    function addElement(type, container, className) {
        var container = document.getElementById(container);
        var element = document.createElement('div');
        element.className = `${type} ${className}`;
        container.appendChild(element);
    
        if (className === 'shape') {
            element.draggable = true;
            element.addEventListener('dragstart', dragStart);
        } else {
            element.addEventListener('dragover', dragOver);
            element.addEventListener('drop', drop);
        }
    }
    
    
    function dragStart(event) {
        if (event.target.className.includes('circle')) {
            var circleDragImage = document.createElement('div');
            document.body.appendChild(circleDragImage);
            circleDragImage.style.width = event.target.offsetWidth + 'px';
            circleDragImage.style.height = event.target.offsetHeight + 'px';
            circleDragImage.style.borderRadius = '50%';
            circleDragImage.style.backgroundColor = getComputedStyle(event.target).backgroundColor;
            circleDragImage.style.position = 'absolute';
            circleDragImage.style.top = '-1000px';
            circleDragImage.style.opacity = '0';
    
            event.dataTransfer.setDragImage(circleDragImage, event.offsetX, event.offsetY);
            setTimeout(() => document.body.removeChild(circleDragImage), 0);
        } else {
            
            event.dataTransfer.setData('text/plain', event.target.className.split(' ')[0]);
        }
    }
    
    
    function dragOver(event) {
        event.preventDefault();
    }
    
    
    function drop(event) {
        event.preventDefault();
        const draggedClass = event.dataTransfer.getData('text/plain').split(' ')[0];
        const draggableElement = document.querySelector('.' + draggedClass);
        const dropZone = event.target;
    
   
        if (dropZone.className.includes(draggedClass)) {
            dropZone.appendChild(draggableElement);
            
            
            draggableElement.style.display = 'none';
            score++;
            updateGameInfo();
            playCorrectSound(); 
    
    
            if (areAllShapesPlaced()) {
                moveToNextLevel();
            }
        } else {
           
            resetShapePosition(draggableElement);
            playBuzzSound(); 
        }
    }
    
    
    
    function areAllShapesPlaced() {
        const shapes = document.querySelectorAll('#shapes .shape');
        return Array.from(shapes).every(shape => shape.style.display === 'none');
    }
    
    
    function moveToNextLevel() {
        if (currentLevel < maxLevel) {
            currentLevel++;
            //console.log("Moving to level:", currentLevel);
            loadShapesForLevel(currentLevel);
        } else {
            alert("Congratulations! You have completed all levels.");
            endGame();
          //  resetGame();
        }
    }
    
    function playCorrectSound() {
        var sound = document.getElementById('correctSound');
        sound.play();
    }
    
    function playBuzzSound() {
        console.log("playBuzzSound called"); 
        var sound = document.getElementById('buzzSound');
        sound.play();
    }
    
    
    function updateGameInfo() {
        document.getElementById('scoreDisplay').textContent = score;
        document.getElementById('levelDisplay').textContent = currentLevel;
    }
    function dragStart(event) {
        event.dataTransfer.setData('text/plain', event.target.className.split(' ')[0]);
    }
    });