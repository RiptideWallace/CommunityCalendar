
exports.seed = function(knex, Promise) {
  return knex('activities').del()
    .then(function () {
      return Promise.all([
         knex('activities').insert({id: 1, place_id: 23, name: 'Sportball - Parent and Child Indoor Multi-Sport(2-3 YRS)', description: 'Focusing on physical literacy and social exploration as toddlers learn fundamental sport skills and participate in creative motor games, in 8 different popular sports. Children are challenged according to their individual skill level and grownups are taught techniques to help toddlers refine motor skills while developing social skills.', start_date: 'July 8th, 2017', end_date: 'August 26th, 2017', price_range: 3, source: 'http://www.oaklandscommunitycentre.com/recreation/preschool', slug: 'sportball-parent-and-child-indoor-multi-sport2-3-yrs-1'}),
        knex('activities').insert({id: 2, place_id: 23, name: 'Kids At Tennis Society (KATS) Tennis Lessons (9-13 YRS)', description: "Using Tennis Canada's progrssive tennis approach we supply smaller raquets and courts, lower nets and low compression balls. All of these are designed to help kids begin to develop confidence in their ability to hit the ball and allows them to be successful very quickly. This program is sponsered by KATS and free for those participants who qualify. L.I.F.E. program members are pre-qualified", start_date: 'June 29th, 2017', end_date: 'August 31st, 2017', price_range: 0 , source: 'http://www.oaklandscommunitycentre.com/recreation/youth', slug: 'kids-at-tennis-society-kats-tennis-lessons-9-13-yrs-2'}),
        knex('activities').insert({id: 3, place_id: 23, name: 'High Intensity Interval Training (HIIT)', description: 'HITT is a total body, heart pumping, aerobic and strength conditioning workout. This interval-based class combines full-body strength training with high intensity cardio bursts designed to tone your body. Expect warm up and cool down times with a half hour HIIT session, between, outdoors if possible. Modifications for all fitness levels are provided.', start_date: 'August 3rd, 2017', end_date: 'September 7th, 2017', price_range: 2, source: 'http://www.oaklandscommunitycentre.com/recreation/adults', slug: 'high-intensity-interval-training-hiit-3'}),
        knex('activities').insert({id: 4, place_id: 23, name: 'Bedtime Yoga' , description: 'Ease tension, release stress, and calm the mind with gentle postures and relaxing breathing practices. This class will help prepare the body, mind and spiritfor a restful sleep. Yoga mats and blocks available.', start_date: 'June 26th, 2017', end_date: 'August 28th, 2017', price_range: 2, source: 'http://www.oaklandscommunitycentre.com/recreation/adults', slug: 'bedtime-yoga-4'}),
        knex('activities').insert({id: 5, place_id: 23, name: 'Community Dinner and Games Night', description: 'Come join us for a community-centred evening the last Sunday of the month except December, July and August. Meet your neighbours, share a meal, and have a laugh while playing cards and board games. All ages welcome.', start_date: 'June 25th, 2017', end_date: 'June 25th, 2017', price_range: 0, source: 'http://www.oaklandscommunitycentre.com/recreation/adults', slug: 'community-dinner-and-games-night-5'}),
        knex('activities').insert({id: 6, place_id: 23, name: 'Drop-In Playgroup - Tiny Tykes (0-5 YRS)', description: 'This is your opportunity to let your kids play with others, meet your neighbours and enjoy our informal family play space. Our playgroup’s large toy collection, activity tables and circle time with instruments serve as a stepping stone to prepare your children for preschool and daycare. Coffee, tea and snack provided.', start_date: 'January 3rd, 2017', end_date: 'June 29th, 2017', price_range: 1, source: 'http://www.oaklandscommunitycentre.com/recreation/preschool', slug: 'drop-in-playgroup-tiny-tykes-0-5-yrs-6'}),
        knex('activities').insert({id: 7, place_id: 23, name: 'Music Together - Bringing Harmony Home', description: 'An internationally recognized mixed age music and movement program for children birth–5 yrs and their parents/caregivers! Come sing, play & have fun with us!', start_date: 'April 6th, 2017', end_date: 'June 8th, 2017', price_range: 3, source: 'http://www.oaklandscommunitycentre.com/recreation/preschool', slug: 'music-together-bringing-harmony-home-7'}),
        knex('activities').insert({id: 8, place_id: 23, name: 'Dance To The Music (2-3 YRS)', description: 'Welcome to the magical world of dance! If your toddler loves music they will love this class. Our instructors facilitate movement, imagery and fun for your child by combining creative dance and games set to inspiring music.', start_date: 'April 22nd, 2017', end_date: 'June 24th, 2017', price_range: 2, source: 'http://www.oaklandscommunitycentre.com/recreation/preschool', slug: 'dance-to-the-music-2-3-yrs-8'}),
        knex('activities').insert({id: 9, place_id: 23, name: 'Sportball Parent & Child Multi-Sport (16 Months - 2 Years)', description: 'Children and parents participate in sports, creative games, songs, rhymes, stories, bubble time and more! Although these programs focus on exploration, each week will introduce a different sport. Parents participate with their child and are encouraged to challenge them according to their skill level.', start_date: 'July 8th, 2017', end_date: 'August 26th, 2017', price_range: 3, source: 'http://www.oaklandscommunitycentre.com/recreation/preschool', slug: 'sportball-parent-and-child-multi-sport-16-months-2-years-9'}),
        knex('activities').insert({id: 10, place_id: 23, name: 'Sportball Parent & Child Outdoor Soccer (2-3 Years)', description: 'Develop skills and learn new techniques to help your child learn the game of soccer. Children and caregivers are taught fundamental concepts of gameplay including throw-ins, dribbling, trapping, passing, goalie skills and more. Non-competitive programs promoting confidence, self-esteem and teamwork for those kids and grownups looking for fun, not competition.', start_date: 'July 6th, 2017', end_date: 'August 31st, 2017', price_range: 3, source: 'http://www.oaklandscommunitycentre.com/recreation/preschool', slug: 'sportball-parent-and-child-outdoor-soccer-2-3-years-10'}),
        knex('activities').insert({id: 11, place_id: 23, name: 'Easter Eggstravaganza', description: 'Join us for this affordable, family fun event to celebrate Easter and spring time! Enjoy a bunny petting zoo, arts and crafts, a sing along and an outdoor hunt for eggs. Bring your friends and family!', start_date: 'April 15th, 2017', end_date: 'August 15th, 2017', price_range: 1, source: 'http://www.oaklandscommunitycentre.com/recreation/preschool', slug: 'easter-eggstravaganza-11'}),
        knex('activities').insert({id: 12, place_id: 23, name: 'Ballet (4-5 Years)', description: 'Bring a tutu and watch your tiny dancer learn basic ballet steps while developing balance, coordination, and confidence. In this class, your child will explore the tremendous movement possibilities of their bodies-jumping, bending, stretching and skipping while developing the skills needed for more formal ballet study', start_date: 'April 22nd, 2017', end_date: 'June 24th, 2017', price_range: 2, source: 'http://www.oaklandscommunitycentre.com/recreation/school-aged', slug: 'ballet-4-5-years-12'}),
        knex('activities').insert({id: 13, place_id: 23, name: 'Sportball Multi-Sport (4-6 Years)', description: 'Refine, rehearse, repeat. Multi-Sport classes are the heart of the Sportball programming. Coaches focus on the basic skills common to all sports, like balance, coordination, stamina, and timing, in a fun, supportive, non-competitive setting that emphasizes teamwork. Each class focuses on one of 8 different popular ball sports.', start_date: 'July 8th, 2017', end_date: 'August 26th, 2017', price_range: 2, source: 'http://www.oaklandscommunitycentre.com/recreation/school-aged', slug: 'sportball-multi-sport-4-6-years-13'}),
        knex('activities').insert({id: 14, place_id: 23, name: 'Hip Hop (4-5 Years)', description: 'Infuse your ‘lil hip hopper’s dance move repertoire with some style. In this class, your child will learn hip hop to funky child-friendly beats. This is a great starter class for your child to explore the wonderful world of dance in a fun environment.', start_date: 'April 22nd, 2017', end_date: 'June 24th, 2017', price_range: 2, source: 'http://www.oaklandscommunitycentre.com/recreation/school-aged', slug: 'hip-hop-4-5-years-14'}),
        knex('activities').insert({id: 15, place_id: 23, name: 'Sportball Outdoor Soccer', description: 'Develop skills and learn new techniques focusing on soccer. Children are taught fundamental concepts of gameplay including throw-ins, dribbling, trapping, passing, goalie skills and more. This is a noncompetitive program promoting confidence, selfesteem and teamwork for those kids looking for fun, not competition. ', start_date: 'July 6th, 2017', end_date: 'August 31st, 2017', price_range: 3, source: 'http://www.oaklandscommunitycentre.com/recreation/school-aged', slug: 'sportball-outdoor-soccer-15'}),
        knex('activities').insert({id: 16, place_id: 23, name: 'FlipOut Fridays (9-12 Years)', description: 'Come hang with your friends or make new ones on Friday nights at Oaklands Community Centre. Dodge ball, baking, field games, crafts, out trips are just a few of the activities you can expect! We provide a fun, safe and welcoming environment for youth to participate in favourite activities and try new ones.', start_date: 'January 6th, 2017', end_date: 'June 23rd, 2017', price_range: 1, source: 'http://www.oaklandscommunitycentre.com/recreation/youth', slug: 'flipout-fridays-9-12-years-16'}),
        knex('activities').insert({id: 17, place_id: 23, name: 'Yoga For Youth', description: 'Youth will be introduced to poses, sequences and breathing exercises that will help boost confidence, strengthen the body and improve posture. Participants will leave this class with a yoga toolbox to help manage stress and tension. This class will also explore partner yoga, meditation, and yoga games.', start_date: 'April 23rd, 2017', end_date: 'May 28th, 2017', price_range: 2, source: 'http://www.oaklandscommunitycentre.com/recreation/youth', slug: 'yoga-for-youth-17'}),
        knex('activities').insert({id: 18, place_id: 23, name: 'Floor Hockey', description: 'Come to Oaklands Elementary School gym and make new friends as you practice your hockey skills off the ice. Equipment is provided, just bring a pair of non-marking shoes and some energy!', start_date: 'January 6th, 2017', end_date: 'June 30th, 2017', price_range: 0, source: 'http://www.oaklandscommunitycentre.com/recreation/youth', slug: 'floor-hockey-18'}),
        knex('activities').insert({id: 19, place_id: 23, name: 'Out And About (13-16 Years)', description: 'We’ve got your Friday nights covered! Out and About focuses on getting teens aged 13-16 yrs out to group activities, events, nature spots and community hubs all over Victoria.', start_date: 'January 6th, 2017', end_date: 'June 30th, 2017', price_range: 1, source: 'http://www.oaklandscommunitycentre.com/recreation/youth', slug: 'out-and-about-13-16-years-19'}),
        knex('activities').insert({id: 20, place_id: 23, name: 'Red Cross Babysitting Course (11-14 Years)', description: 'A certified Red Cross program for prospective babysitters! This fun, educational and interactive course will include: the basics of babysitting, safety procedures, activities for young children, steps to handle emergencies and more. The class culminates with a test and certificate upon completion.', start_date: 'May 19th, 2017', end_date: 'May 19th, 2017', price_range: 2, source: 'http://www.oaklandscommunitycentre.com/recreation/youth', slug: 'red-cross-babysitting-course-11-14-years-20'}),
        knex('activities').insert({id: 21, place_id: 23, name: 'Pilates', description: 'Pilates is a unique form of exercise that is designed to condition the entire body through the focus of alignment, core strength, breath, and flowing movement. Pilates allows you to move with greater efficiency and form. ', start_date: 'April 12th, 2017', end_date: 'June 14th, 2017', price_range: 2, source: 'http://www.oaklandscommunitycentre.com/recreation/adults', slug: 'pilates-21'}),
        knex('activities').insert({id: 22, place_id: 23, name: 'Zumba', description: 'Join us for one of the fastest growing Latin dance inspired fitness crazes across the world! People of all ages are falling in love with its infectious music, easyto-follow dance moves and body-sculpting benefits. Come dance to the rhythms of Salsa, Merengue, Mambo and other Latin beats', start_date: 'June 12th, 2017', end_date: 'July 24th, 2017', price_range: 2, source: 'http://www.oaklandscommunitycentre.com/recreation/adults', slug: 'zumba-22'}),
        knex('activities').insert({id: 23, place_id: 23, name: 'Nordic Pole Walking', description: 'Follow a 3–day a week schedule, two days of home workouts and one day with us to learn to Nordic Style pole walk, including hills. Make new friends and improve your posture, pant size, fitness and health. Poles available on program nights, and available for purchase for home use. Borrow poles for free the first night to see if you like pole walking. ', start_date: 'May 9th, 2017', end_date: 'June 13th, 2017', price_range: 2, source: 'http://www.oaklandscommunitycentre.com/recreation/adults', slug: 'nordic-pole-walking-23'}),
        knex('activities').insert({id: 24, place_id: 23, name: 'DIY Sun Cream and Deodorant Workshop', description: 'Learn how to make natural deodorant and better understand toxic and non-toxic ingredients in commercial deodorants and anti-perspirants. You will also make sun cream (SPF 25) using natural ingredients and zinc oxide. Your skin will have the safest summer ever', start_date: 'June 25th, 2017', end_date: 'June 25th, 2017', price_range: 2, source: 'http://www.oaklandscommunitycentre.com/recreation/adults', slug: 'diy-sun-cream-and-deodorant-workshop-24'}),
        knex('activities').insert({id: 25, place_id: 23, name: 'Rejuvenation Yoga', description: 'A Hatha practice that offers mind, body and spiritual instruction to inspire and rejuvenate. This class will offer a few twists to the classical style. Join in this fresh and fun class to find your flexible body, calm your mind and inspire your spirit. Yoga mats and blocks available.', start_date: 'June 8th, 2017', end_date: 'July 27th, 2017', price_range: 2, source: 'http://www.oaklandscommunitycentre.com/recreation/adults', slug: 'rejuvenation-yoga-25'}),
        knex('activities').insert({id: 26, place_id: 23, name: 'Gentle Yoga', description: 'Learn the basics of yoga, improve your balance, strengthen your core AND increase your overall body strength! Leave class feeling relaxed and focused. This is a fun, multilevel yoga class that’s suitable for all ages. Yoga mats and blocks available.', start_date: 'June 28th, 2017', end_date: 'August 30th, 2017', price_range: 2, source: 'http://www.oaklandscommunitycentre.com/recreation/adults', slug: 'gentle-yoga-26'}),
        knex('activities').insert({id: 27, place_id: 24, name: 'Bricks 4 Kidz: Life Science', description: 'Explore the fascinating science of living things and build engaging models of creatures from caterpillars to dinosaurs. Participants explore topics such as how the human body stays cool, the amazing life cycle of a butterfly, and investigate the Venus Fly Trap – a plant that eats bugs! If you love creatures, this is the program for you.', start_date: 'May 23rd, 2017', end_date: 'June 27th, 2017', price_range: 2, source: 'http://www.victoriawest.ca/classes-item/bricks-4-kidz-life-science/', slug: 'bricks-4-kidz-life-science-27'}),
        knex('activities').insert({id: 28, place_id: 24, name: 'Chemical Engineering (6-12 Years)', description: 'Get ready to create a solution to clean up an oil spill, develop your own rocket fuel, and discover the mysteries behind pigmentation.', start_date: 'January 18th, 2017', end_date: 'February 22nd, 2017', price_range: 3, source: 'http://www.victoriawest.ca/classes-item/chemical-engineering-6-12-years/', slug: 'chemical-engineering-6-12-years-28'}),
        knex('activities').insert({id: 29, place_id: 24, name: 'Creative Dramaticks for Home Learners', description: 'Jump into the world of drama with fun, engaging games, activities, and stories.  Come join us to develop drama skills such as mime, improvisation, movement, and problem solving in role.', start_date: 'January 23rd, 2017', end_date: 'February 27th, 2017', price_range: 2, source: 'http://www.victoriawest.ca/classes-item/creative-drama-for-home-learners/', slug: 'creative-dramaticks-for-home-learners-29'}),
        knex('activities').insert({id: 30, place_id: 24, name: 'Dragstar Car Challenge (7-12 Years)', description: 'Join us for a fun afternoon of car building and competitions! Teams will create their own air powered, aerodynamic drag cars and battle in races that test for speed, distance, longest jumps, biggest crasher, and more!', start_date: 'January 3rd, 2017', end_date: 'January 3rd, 2017', price_range: 2, source: 'http://www.victoriawest.ca/classes-item/dragster-car-challenge-7-12-years/', slug: 'dragstar-car-challenge-7-12-years-30'}),
        knex('activities').insert({id: 31, place_id: 24, name: 'Engineering 101 (6-12 Years)', description: 'Are you curious how airplanes fly? How wind turbines make energy? Or how bridges carry heavy trucks? They are all designed and built by Engineers. Engineering 101 offers a new challenge each week in areas like Aerospace, Civil, Mechanical, Marine, Environmental and more.', start_date: 'September 14th, 2017', end_date: 'October 19th, 2017', price_range: 3, source: 'http://www.victoriawest.ca/classes-item/engineering-101-6-12-years/', slug: 'engineering-101-6-12-years-31'}),
      ]);
    });
};
