
% Example of how to extract a subset of a matrix:

filename='multi_reanal.partition.ak_4m.197901.nc';
nco=ncgeodataset(filename);

%Now I choose a variable I want to index, for example wind_speed.  The
%general indexing syntax is like this:
%      wind=nco{'wind_speed'}(times,rows,cols);
%The dimensions are time x rows x columns, so if you want to get a
%particular point, say (200,200) for all times you can do this:

wind=nco{'wind_speed'}(:,200,200);

%Subregions can be accessed by setting vector ranges for them, like so:

wind=nco('wind_speed'}(1:10,200:210,190:200);

%This loads the first 10 times for a 10x10 rectangle of points in the
%grid.

%Two things to keep in mind.  The data is stored in single precision
%(that's how the netcdf is defined), and some matlab plotting routines
%don't like single precision.  For that use the double() function
%before or when you plot.  pcolor is one of those routines.

%The other is that you may need to squeeze() the arrays that come from
%the nco object, if they come in with something like

wind=nco{'wind_speed'}(1,:,:);
size(wind)

%ans =
%
%     1   391   548
%     
%There's a good tutorial on using ncgeodataset here:
%     https://github.com/nctoolbox/nctoolbox/wiki/UsingNcgeodataset
     

%-----------------------------------------
%
%Example of how to access non-continuous points from a matrix:

%
% want points (1,1),(2,3),(3,5),(4,10) from a 5x10 array
%

% start by building a sample array

x = [1 2 3 4 5 6 7 8 9 10];
y=[1 2 3 4 5];

data=reshape([1:50],length(y),length(x));

%data =
%
%     1     6    11    16    21    26    31    36    41    46
%     2     7    12    17    22    27    32    37    42    47
%     3     8    13    18    23    28    33    38    43    48
%     4     9    14    19    24    29    34    39    44    49
%     5    10    15    20    25    30    35    40    45    50
     
     
% now construct your index vectors from your points (can be any points in any order)

i=[1,2,3,4];
j=[1,3,5,10];

% find your 1-D index into your 2-D array

ind=sub2ind(size(data),i,j);

% now extract the points

data(ind)

%ans =
%
%     1    12    23    49
%     
%For more information on linear indexing in MATLAB arrays:
%   https://www.mathworks.com/help/matlab/math/matrix-indexing.html#f1-85511
