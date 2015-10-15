<!DOCTYPE html>
<html>
<head>
    <title>Course list</title>
    <meta charset="utf-8" />
    <link href="courses.css" type="text/css" rel="stylesheet" />
</head>
<body>
<div id="header">
    <h1>Courses at CSE</h1>
	
<!-- Ex. 1: File of Courses -->
	<?php
		$file = "courses.tsv";
        $lines = file($file); 
        $filename = basename($file);
	?>
    <p>
        Course list has <?= count($lines) ?> total courses
        and
        size of <?= filesize($filename) ?> bytes.
    </p>
</div>
<div class="article">
    <div class="section">
        <h2>Today's Courses</h2>
		
<!-- Ex. 2: Today’s Courses & Ex 6: Query Parameters -->
        <?php
			$numberOfCourses = 4;
			if (isset($_GET["number_of_courses"]) == 1 && $_GET["number_of_courses"] != "") {
				$numberOfCourses = (int) $_GET["number_of_courses"];
			}
			
            function getCoursesByNumber($listOfCourses, $numberOfCourses){
                $resultArray = array();
				if(numberOfCourses == 1) {
					$resultArray = array_rand($listOfCourses);
				}
				else {
					$resultArray = array_rand($listOfCourses, $numberOfCourses);
				}
                return $resultArray;
            }
			$todaysCourses = getCoursesByNumber($lines, $numberOfCourses);
        ?>
        <ol>
			<?php
				if($numberOfCourses == 1) {
					$tokenwords = explode("\t", $lines[$todaysCourses]);
					$newString = implode(" - ", $tokenwords); ?>
					<li><?= $newString ?></li>
				<?php
				}
				else {
					foreach ($todaysCourses as $todayCourses) {
						$tokenwords = explode("\t", $lines[$todayCourses]);
						$newString = implode(" - ", $tokenwords); ?>
						<li><?= $newString ?></li>
				<?php }
				}
			?>
        </ol>
    </div>
    <div class="section">
        <h2>Searching Courses</h2>
		
<!-- Ex. 3: Searching Courses & Ex 6: Query Parameters -->
        <?php
			$startCha = "C";
			if (isset($_GET["character"])) {
				$startCha = $_GET["character"];
			}
			
            function getCoursesByCharacter($listOfCourses, $startCharacter){
                $resultArray = array();
				foreach($listOfCourses as $listCourses) {
					if ($listCourses[0] == $startCharacter) {
						array_push($resultArray, $listCourses);
					}
				}
                return $resultArray;
            }
			$searchedCourses = getCoursesByCharacter($lines, $startCha);
        ?>
        <p>
            Courses that started by <strong>'<?= $startCha ?>'</strong> are followings :
        </p>
        <ol>
            <?php
				foreach ($searchedCourses as $searchCourses) {
					$tmp3 = explode("\t", $searchCourses);
					$tmp4 = implode(" - ", $tmp3); ?>
					<li><?= $tmp4 ?></li>
				<?php }
			?>
        </ol>
    </div>
    <div class="section">
        <h2>List of Courses</h2>
<!-- Ex. 4: List of Courses & Ex 6: Query Parameters -->
        <?php
			$orderby = 0;
			$ordering = "alphabet order";
			
			if (isset($_GET["orderby"])) {
				$orderby = $_GET["orderby"];
			}
		
            function getCoursesByOrder($listOfCourses, $orderby){
                $resultArray = $listOfCourses;
				if($orderby == 0) {
					sort($resultArray);
				}
				else if($orderby == 1) {
					rsort($resultArray);
					$ordering = "alphabet reverse order";
				}
				else {
					print "Input error.";
					exit(1);
				}
                return $resultArray;
            }
			$orderedlist = getCoursesByOrder($lines, $orderby);
        ?>
        <p>
            All of courses ordered by <strong><?= $ordering?></strong> are followings :
        </p>
        <ol>
			<?php
				foreach($orderedlist as $orderedlist2) {
					$tmp5 = explode("\t", $orderedlist2);
					$tmp6 = implode(" - ", $tmp5);
				
					if (strlen($tmp5[0]) > 20){?>
						<li class = "long"><?= $tmp6 ?></li>
				<?php }
					else { ?>
						<li><?= $tmp6 ?></li>
					<?php
					}
				}
			?>
        </ol>
    </div>
    <div class="section">
        <h2>Adding Courses</h2>
<!-- Ex. 5: Adding Courses & Ex 6: Query Parameters -->
		<?php
		if (isset($_GET["new_Course"]) && isset($_GET["code"])) {
			$newCourse = $_GET["new_Course"];
			$codeOfCourse = $_GET["code"];
			
			$newarray[0] = $newCourse;
			$newarray[1] = $codeOfCourse;
			
			$newCourse = implode("\t", $newarray);
			file_put_contents($file, "\n", FILE_APPEND);
			file_put_contents($file, $newCourse, FILE_APPEND); ?>
			<p>Adding a course is success!</p>
		<?php 
		}
		else { ?>
			<p>Input course or code of the course doesn't exist</p>
		<?php }
		?>
    </div>
</div>
<div id="footer">
    <a href="http://validator.w3.org/check/referer">
        <img src="http://selab.hanyang.ac.kr/courses/cse326/2015/problems/images/w3c-html.png" alt="Valid HTML5" />
    </a>
    <a href="http://jigsaw.w3.org/css-validator/check/referer">
        <img src="http://selab.hanyang.ac.kr/courses/cse326/2015/problems/images/w3c-css.png" alt="Valid CSS" />
    </a>
</div>
</body>
</html>