// https://github.com/patriciogonzalezvivo/glslViewer
/*
F:\>cd TheBookOfShadersCoursework\Chapter5
F:\L_GLSL>glslViewer ShapingFunctions.frag
*/
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
#define PI 3.14159265359
vec3 colorA = vec3(0.149,0.141,0.912);
vec3 colorB = vec3(1.000,0.833,0.224);

float plot (vec2 st)
{
    return smoothstep(0.02, 0.0, abs(st.y - st.x));
}

float plot2 (vec2 st, float pct)
{
    float lineWidth = 0.02;
    return smoothstep(pct-lineWidth, pct, st.y) -
        smoothstep(pct, pct+lineWidth, st.y);
}
void main()
{
	vec2 st = gl_FragCoord.xy/u_resolution;
    
    // Plot a line
    float y = st.x;
    // Plot pow
    y = pow(st.x, 5.);
    // Plot sqrt
    y = sqrt(st.x);
    
    // Plot log
    y = log(st.x+1.);
    
	// Plot exp
    y = exp(st.x-1.);

    // Plot Step
    /*
    The step() interpolation receives two parameters. 
    The first one is the limit or threshold, while the second one is the value we want to check or pass. 
    Any value under the limit will return 0.0 while everything above the limit will return 1.0.
    */
    y = step(0.5, st.x);
    
    // Plot SmoothStep
    /*
    Given a range of two numbers and a value, this function will interpolate the value between the defined range. 
    The two first parameters are for the beginning and end of the transition, while the third is for the value to interpolate.
    */
    y = smoothstep(0.1, 0.9, st.x);

    // Plot sine
    // Add time (u_time) to x before computing the sin. Internalize that motion along x.
    y = sin(u_time + st.x);

    // Multiply x by PI before computing the sin
    //Note how the two phases shrink so each cycle repeats every 2 integers.
    y = sin(st.x * PI);

    // Multiply time (u_time) by x before computing the sin. 
    // See how the frequency between phases becomes more and more compressed.
    y = sin(u_time * st.x);

    // Add 1.0 to sin(x)
    // See how all the wave is displaced up and now all values are between 0.0 and 2.0.
    y = 1.0 + sin(u_time + st.x * PI);

    // Multiply sin(x) by 2.0. 
    // See how the amplitude doubles in size.
    y = 2.0 * sin(u_time + st.x * PI);

    // Compute the absolute value (abs()) of sin(x). 
    // It looks like the trace of a bouncing ball.
    y = abs(sin(u_time + st.x * PI));

    // Extract just the fraction part (fract()) of the resultant of sin(x).
    y = fract(sin(u_time + st.x * PI));

    // Add the higher integer (ceil()) and the smaller integer (floor()) of the resultant of sin(x) to get a digital wave of 1 and -1 values
    y = ceil(sin(u_time + st.x * PI)) + floor(sin(u_time + st.x * PI));


    // Draw the line
    float pct = plot2(st,y);
    vec3 color = vec3(y);
    color = (1.0-pct)*color*mix(colorA, colorB, y) + pct*vec3(0.0,1.0,0.0);
    
    gl_FragColor = vec4(color,1.0);
}